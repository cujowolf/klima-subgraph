import { BigDecimal } from '@graphprotocol/graph-ts'

import { BondCreated, BondRedeemed } from '../generated/BCTBondV1/BondV1'
import { Deposit } from '../generated/schema'
import { loadOrCreateTransaction } from "./utils/Transactions"
import { toDecimal } from "../../lib/utils/Decimals"
import { BCT_BOND_TOKEN } from '../../lib/utils/Constants'
import { loadOrCreateToken } from './utils/Tokens'
import { loadOrCreateRedemption } from './utils/Redemption'
import { createDailyBondRecord } from './utils/DailyBond'
import { getKLIMABCTRate } from './utils/Price'
import { loadOrCreateBonder } from './utils/Bonder'


export function handleDeposit(event: BondCreated): void {
    let bonder = loadOrCreateBonder(event.transaction.from)
    let transaction = loadOrCreateTransaction(event.transaction, event.block)

    let deposit = new Deposit(transaction.id)
    deposit.token = BCT_BOND_TOKEN;
    deposit.transaction = transaction.id
    deposit.bonder = bonder.id
    deposit.payout = toDecimal(event.params.payout, 9)
    deposit.bondPrice = toDecimal(event.params.priceInUSD, 18)
    deposit.marketPrice = getKLIMABCTRate()
    deposit.discount = (deposit.marketPrice.minus(deposit.bondPrice)).div(deposit.marketPrice)
    deposit.tokenValue = toDecimal(event.params.deposit, 18)
    deposit.carbon = deposit.tokenValue
    deposit.carbonCustodied = deposit.tokenValue
    deposit.timestamp = transaction.timestamp;
    deposit.save()

    createDailyBondRecord(deposit.timestamp, token, deposit.payout, deposit.value)
    updateKlimateBalance(klimate, transaction)
}

export function handleRedeem(event: BondRedeemed): void {
    let klimate = loadOrCreateKlimate(event.params.recipient)
    let transaction = loadOrCreateTransaction(event.transaction, event.block)

    let redemption = loadOrCreateRedemption(event.transaction)
    redemption.transaction = transaction.id
    redemption.klimate = klimate.id
    redemption.token = loadOrCreateToken(BCT_BOND_TOKEN).id;
    redemption.timestamp = transaction.timestamp;
    redemption.save()
    updateKlimateBalance(klimate, transaction)
}
