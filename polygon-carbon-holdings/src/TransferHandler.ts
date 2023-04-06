import { Address, store } from '@graphprotocol/graph-ts'
import { loadOrCreateToken } from '../../lib-updated/utils/Token'
import { Account, Holding } from '../generated/schema'
import { Transfer } from '../generated/BaseCarbonTonne/ERC20'
import { ZERO_BI } from '../../lib-updated/utils/Decimals'

export function handleTransfer(event: Transfer): void {
    let token = loadOrCreateToken(event.address)
    createAccount(event.params.from)
    createAccount(event.params.to)

    let fromHolding = loadOrCreateHolding(event.params.from, event.address)
    let toHolding = loadOrCreateHolding(event.params.to, event.address)

    fromHolding.amount = fromHolding.amount.minus(event.params.value)
    fromHolding.lastUpdated = event.block.timestamp
    fromHolding.save()
    if (fromHolding.amount == ZERO_BI) {
        store.remove('Holding', fromHolding.id.toHexString())
    }

    toHolding.amount = toHolding.amount.plus(event.params.value)
    toHolding.lastUpdated = event.block.timestamp
    toHolding.save()
}

function createAccount(accountAddress: Address): void {
    let account = Account.load(accountAddress)
    if (account == null) {
        account = new Account(accountAddress)
        account.save()
    }
}

function loadOrCreateHolding(account: Address, token: Address): Holding {
    let holding = Holding.load(account.concat(token))
    if (holding == null) {
        holding = new Holding(account.concat(token))
        holding.account = account
        holding.token = token
        holding.amount = ZERO_BI
        holding.lastUpdated = ZERO_BI
        holding.save()
    }
    return holding as Holding
}
