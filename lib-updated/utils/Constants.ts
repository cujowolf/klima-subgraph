// Tokens definition

import { Address, BigInt } from '@graphprotocol/graph-ts'

// ERC20
export const BCT_TOKEN: string = 'BCT'
export const MCO2_TOKEN: string = 'MCO2'
export const UBO_TOKEN: string = 'UBO'
export const NBO_TOKEN: string = 'NBO'
export const NCT_TOKEN: string = 'NCT'
export const KLIMA_TOKEN: string = 'KLIMA'
export const SKLIMA_TOKEN: string = 'sKLIMA'
export const WSKLIMA_TOKEN: string = 'wsKLIMA'
// LP Bonds
export const KLIMABCT_LPBOND_TOKEN: string = 'KLIMA-BCT'
export const BCTUSDC_LPBOND_TOKEN: string = 'BCT-USDC'
export const KLIMAMCO2_LPBOND_TOKEN: string = 'KLIMA-MCO2'
export const KLIMAUBO_LPBOND_TOKEN: string = 'KLIMA-UBO'
export const KLIMANBO_LPBOND_TOKEN: string = 'KLIMA-NBO'
export const KLIMAUSDC_LPBOND_TOKEN: string = 'KLIMA-USDC'
// Reserve Bonds
export const BCT_BOND_TOKEN: string = 'BCT'
export const MCO2_BOND_TOKEN: string = 'MCO2'
export const UBO_BOND_TOKEN: string = 'UBO'
export const NBO_BOND_TOKEN: string = 'NBO'

export const USDC_INVERSE_BOND: string = 'USDC-INVERSE'

// LP Pair Addresses and Blocks
export const KLIMA_BCT_PAIR = Address.fromString('0x9803c7aE526049210a1725F7487AF26fE2c24614')
export const KLIMA_BCT_PAIR_BLOCK = '20294501'
export const BCT_USDC_PAIR = '0x1E67124681b402064CD0ABE8ed1B5c79D2e02f64'
export const BCT_USDC_PAIR_BLOCK = '20294523'
export const BCT_USDC_PAIR_REMOVE_LIQUIDITY_BLOCK = BigInt.fromI32(29479227)
export const NCT_USDC_PAIR = '0xDb995F975F1Bfc3B2157495c47E4efB31196B2CA'
export const NCT_USDC_PAIR_BLOCK = '24782864'
export const KLIMA_MCO2_PAIR = '0x64a3b8ca5a7e406a78e660ae10c7563d9153a739'
export const KLIMA_MCO2_PAIR_BLOCK = '23688190'
export const KLIMA_USDC_PAIR = '0x5786b267d35f9d011c4750e0b0ba584e1fdbead1'
export const KLIMA_USDC_PAIR_BLOCK = '20358666'
export const KLIMA_USDC_PAIR_BOLSTER_LIQUIDITY_BLOCK = BigInt.fromI32(25979319)
export const KLIMA_UBO_PAIR = Address.fromString('0x5400A05B8B45EaF9105315B4F2e31F806AB706dE')
export const KLIMA_UBO_PAIR_BLOCK = BigInt.fromI32(26470811)
export const KLIMA_NBO_PAIR = Address.fromString('0x251cA6A70cbd93Ccd7039B6b708D4cb9683c266C')
export const KLIMA_NBO_PAIR_BLOCK = BigInt.fromI32(26470990)
export const MCO2_USDC_PAIR = '0x68aB4656736d48bb1DE8661b9A323713104e24cF'
export const TREASURY_ADDRESS = '0x7Dd4f0B986F032A44F913BF92c9e8b7c17D77aD7'

// Bond Contract Addresses and Blocks
export const BCTBOND_V1 = '0x7De627C56D26529145a5f9D85948ecBeAF9a4b34'
export const BCTBOND_V1_BLOCK = '20474645'
export const BCT_USDC_BOND_V1 = '0xBF2A35efcd85e790f02458Db4A3e2f29818521c5'
export const BCT_USDC_BOND_V1_BLOCK = '20400980'
export const KLIMA_BCT_BOND_V1 = '0x1E0Dd93C81aC7Af2974cdB326c85B87Dd879389B'
export const KLIMA_BCT_BOND_V1_BLOCK = '20400975'
export const MCO2BOND_V1 = '0x27217c3F5bEc4c12Fa506A101bC4bd15417AEAa8'
export const MCO2BOND_V1_BLOCK = '23300000'
export const MCO2BOND_V1_2 = '0x00Da51bC22edF9c5A643da7E232e5a811D10B8A3'
export const MCO2BOND_V1_2_BLOCK = '26055400'
export const KLIMA_MCO2_BOND_V1 = '0xf9c3FC299dE5f86d9CD6a724e6B44933720f5e6D'
export const KLIMA_MCO2_BOND_V1_BLOCK = '24000000'
export const KLIMA_MCO2_BOND_V1_2 = '0x18c3713d523f91fBd26E65C8BaBAB63A0f31B9a6'
export const KLIMA_MCO2_BOND_V1_2_BLOCK = '26055500'
export const KLIMA_USDC_BOND_V1 = '0xb5aF101742EcAe095944F60C384d09453006bFde'
export const KLIMA_USDC_BOND_V1_BLOCK = '23920000'
export const UBOBOND_V1 = '0x08eE531979B730Dbb63469BC56E1d6cD9F43b8d4'
export const UBOBOND_V1_BLOCK = '27329320'
// export const KLIMA_UBO_BOND_V1 = ''
// export const KLIMA_UBO_BOND_V1_BLOCK = ''
export const NBOBOND_V1 = '0x285A6054DdC2980C62E716086B065E1e770fffb3'
export const NBOBOND_V1_BLOCK = '27329359'
// export const KLIMA_NBO_BOND_V1 = ''
// export const KLIMA_NBO_BOND_V1_BLOCK = ''
export const PRO_KLIMA_V2 = '0xcf37f6B4754b34eA32a49cF5def3095a17732C1b'
export const PRO_KLIMA_V2_BLOCK = '28719259'
export const BOND_VERSION_V1 = 'BOND_V1'
export const BOND_VERSION_V2 = 'BOND_V2'

// Token Addresses
export const KLIMA_ERC20_CONTRACT = Address.fromString('0x4e78011ce80ee02d2c3e649fb657e45898257815')
export const SKLIMA_ERC20_CONTRACT = Address.fromString('0xb0C22d8D350C67420f06F48936654f567C73E8C8')
export const BCT_ERC20_CONTRACT = Address.fromString('0x2f800db0fdb5223b3c3f354886d907a671414a7f')
export const NCT_ERC20_CONTRACT = Address.fromString('0xD838290e877E0188a4A44700463419ED96c16107')
export const MCO2_ERC20_CONTRACT = Address.fromString('0xaa7dbd1598251f856c12f63557a4c4397c253cea')
export const UBO_ERC20_CONTRACT = Address.fromString('0x2B3eCb0991AF0498ECE9135bcD04013d7993110c')
export const NBO_ERC20_CONTRACT = Address.fromString('0x6BCa3B77C1909Ce1a4Ba1A20d1103bDe8d222E48')
export const USDC_ERC20_CONTRACT = Address.fromString('0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174')

// Protocol Functional Addresses
export const DAO_MULTISIG = '0x65a5076c0ba74e5f3e069995dc3dab9d197d995c'
export const STAKING_CONTRACT_V1 = '0x25d28a24Ceb6F81015bB0b2007D795ACAc411b4d'
export const BONDING_CALCULATOR = '0x0b8d6D6611Ed7cCe01BbcC57826548C6107B0478'

//Vesting constants
export const C3_PLATFORM = 'C3'
export const C3_WSKLIMA_CONTRACT = '0xe02efadA566Af74c92b6659d03BAaCb4c06Cc856'
export const C3_WSKLIMA_INIT_TIMESTAMP = '1651449600' //Date Timestamp of contract creation

export const NFT_CO2COMPOUND_PLATFORM = 'NFT_CO2_COMPOUND'
export const NFT_CO2COMPOUND_CONTRACT = '0x08e253270240509E57B9543c0453F0bAc839d0a1'
export const NFT_CO2COMPOUND_INIT_TIMESTAMP = '1638486000' //Date Timestamp of contract creation

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const KLIMA_PAIRED_LIQUIDITY = [UBO_ERC20_CONTRACT, NBO_ERC20_CONTRACT]
