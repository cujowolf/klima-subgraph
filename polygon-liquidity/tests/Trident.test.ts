import { afterEach, assert, beforeEach, clearStore, describe, logStore, test } from 'matchstick-as/assembly/index'

import { createSwapEvent } from './helpers/TridentHelper'
import { KLIMA_ERC20_CONTRACT, KLIMA_NBO_PAIR, NBO_ERC20_CONTRACT } from '../../lib-updated/utils/Constants'
import { Address, BigInt } from '@graphprotocol/graph-ts'
import { handleSwap } from '../src/TridentPair'

let account = Address.fromString('0x1234567890abcdef1234567890abcdef12345678')

describe('Pool Entity: Single Event Tests', () => {
  beforeEach(() => {})

  afterEach(() => {
    clearStore()
  })

  describe('Swap', () => {
    test('Deposit counter incremented', () => {
      let event = createSwapEvent(
        KLIMA_NBO_PAIR,
        account,
        KLIMA_ERC20_CONTRACT,
        NBO_ERC20_CONTRACT,
        BigInt.fromI32(1000000000),
        BigInt.fromString('1500000000000000000')
      )

      handleSwap(event)

      logStore()

      assert.assertTrue(true)
    })
  })
})
