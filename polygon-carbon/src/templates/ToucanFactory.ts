import { ToucanCarbonOffsets } from '../../generated/templates'
import { TokenCreated } from '../../generated/ToucanFactory/ToucanCarbonOffsetsFactory'
import { loadOrCreateCarbonOffset, updateCarbonOffsetWithCall } from '../utils/CarbonOffset'
import { createTokenWithCall } from '../utils/Token'

export function handleNewTCO2(event: TokenCreated): void {
  // Start indexing the TCO2 tokens; `event.params.tokenAddress` is the
  // address of the new token contract

  ToucanCarbonOffsets.create(event.params.tokenAddress)
  loadOrCreateCarbonOffset(event.params.tokenAddress, 'TOUCAN')
  createTokenWithCall(event.params.tokenAddress)
  updateCarbonOffsetWithCall(event.params.tokenAddress, 'TOUCAN')
}
