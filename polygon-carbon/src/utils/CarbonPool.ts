import { Address, BigInt, Bytes } from '@graphprotocol/graph-ts'
import { CarbonPool, CarbonPoolDailySnapshot, PoolDeposit, PoolRedeem } from '../../generated/schema'
import { ZERO_BI } from '../../../lib/utils/Decimals'
import { dayFromTimestamp } from '../../../lib/utils/Dates'

export function loadOrCreateCarbonPool(poolAddress: Address): CarbonPool {
  let pool = CarbonPool.load(poolAddress)
  if (pool) return pool as CarbonPool

  pool = new CarbonPool(poolAddress)
  pool.supply = ZERO_BI
  pool.crossChainSupply = ZERO_BI
  pool.lastSnapshotDayID = 0
  pool.nextSnapshotDayID = 0
  pool.save()
  return pool as CarbonPool
}

export function loadCarbonPool(poolAddress: Address): CarbonPool {
  return CarbonPool.load(poolAddress) as CarbonPool
}

export function savePoolDeposit(
  id: Bytes,
  account: Address,
  pool: Address,
  offset: Address,
  amount: BigInt,
  timestamp: BigInt
): void {
  let deposit = new PoolDeposit(id)
  deposit.account = account
  deposit.pool = pool
  deposit.offset = offset
  deposit.amount = amount
  deposit.timestamp = timestamp
  deposit.poolSnapshotID = pool.concatI32(dayFromTimestamp(timestamp))
  deposit.poolOffsetSnapshotID = pool.concat(offset).concatI32(dayFromTimestamp(timestamp))
  deposit.save()
}

export function savePoolRedeem(
  id: Bytes,
  account: Address,
  pool: Address,
  offset: Address,
  amount: BigInt,
  timestamp: BigInt
): void {
  let redeem = new PoolRedeem(id)
  redeem.account = account
  redeem.pool = pool
  redeem.offset = offset
  redeem.amount = amount
  redeem.timestamp = timestamp
  redeem.poolSnapshotID = pool.concatI32(dayFromTimestamp(timestamp))
  redeem.poolOffsetSnapshotID = pool.concat(offset).concatI32(dayFromTimestamp(timestamp))
  redeem.save()
}

/** Snapshot management */

export function checkForCarbonPoolSnapshot(poolAddress: Address, timestamp: BigInt, blockNumber: BigInt): void {
  // We check for the prior period snapshot and then take one if needed
  let dayID = dayFromTimestamp(timestamp)

  let pool = loadOrCreateCarbonPool(poolAddress)

  if (dayID > pool.lastSnapshotDayID) {
    pool.nextSnapshotDayID = dayID
    pool.save()
  }

  if (dayID - 1 > pool.lastSnapshotDayID)
    takeCarbonPoolDailySnapshot(poolAddress, pool.nextSnapshotDayID, timestamp, blockNumber)
}

export function takeCarbonPoolDailySnapshot(
  poolAddress: Address,
  dayID: i32,
  timestamp: BigInt,
  blockNumber: BigInt
): void {
  let pool = loadCarbonPool(poolAddress)

  if (pool.lastSnapshotDayID == 0) {
    loadOrCreateCarbonPoolDailySnapshot(poolAddress, dayID, timestamp, blockNumber)
    pool.lastSnapshotDayID = dayID
    pool.save()
    return
  }

  let priorDay = pool.lastSnapshotDayID
  pool.lastSnapshotDayID = dayID
  pool.save()

  let priorSnapshot = loadOrCreateCarbonPoolDailySnapshot(poolAddress, priorDay, timestamp, blockNumber)
  let newSnapshot = loadOrCreateCarbonPoolDailySnapshot(poolAddress, pool.lastSnapshotDayID, timestamp, blockNumber)

  newSnapshot.deltaSupply = newSnapshot.supply.minus(priorSnapshot.supply)
  newSnapshot.save()
}

export function loadOrCreateCarbonPoolDailySnapshot(
  poolAddress: Address,
  dayID: i32,
  timestamp: BigInt,
  blockNumber: BigInt
): CarbonPoolDailySnapshot {
  let snapshot = CarbonPoolDailySnapshot.load(poolAddress.concatI32(dayID))
  if (snapshot == null) {
    let pool = loadCarbonPool(poolAddress)
    snapshot = new CarbonPoolDailySnapshot(poolAddress.concatI32(dayID))
    snapshot.pool = poolAddress
    snapshot.dayID = dayID
    snapshot.supply = pool.supply
    snapshot.deltaSupply = ZERO_BI
    snapshot.lastUpdateTimestamp = timestamp
    snapshot.lastUpdateBlockNumber = blockNumber
    snapshot.save()
  }
  return snapshot as CarbonPoolDailySnapshot
}

export function updateCarbonPoolCrossChain(poolAddress: Address, amount: BigInt): void {
  let pool = loadCarbonPool(poolAddress)
  // pool.supply = pool.supply.plus(amount) // account for the reduction by sending to zero address
  pool.crossChainSupply = pool.crossChainSupply.plus(amount)
  pool.save()
}
