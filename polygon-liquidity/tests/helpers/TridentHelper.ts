import { Address, BigInt, ethereum } from '@graphprotocol/graph-ts'
import { newMockEvent } from 'matchstick-as'
import { Swap } from '../../generated/KLIMA_NBO/TridentPair'

export function createSwapEvent(
  pool: Address,
  account: Address,
  tokenIn: Address,
  tokenOut: Address,
  amountIn: BigInt,
  amountOut: BigInt
): Swap {
  let event = changetype<Swap>(newMockEvent())

  event.address = pool
  event.transaction.from = account
  event.parameters = new Array()

  let param1 = new ethereum.EventParam('recipient', ethereum.Value.fromAddress(account))
  let param2 = new ethereum.EventParam('tokenIn', ethereum.Value.fromAddress(tokenIn))
  let param3 = new ethereum.EventParam('tokenOut', ethereum.Value.fromAddress(tokenOut))
  let param4 = new ethereum.EventParam('amountIn', ethereum.Value.fromUnsignedBigInt(amountIn))
  let param5 = new ethereum.EventParam('amountOut', ethereum.Value.fromUnsignedBigInt(amountOut))

  event.parameters.push(param1)
  event.parameters.push(param2)
  event.parameters.push(param3)
  event.parameters.push(param4)
  event.parameters.push(param5)

  return event as Swap
}
