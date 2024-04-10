import {EvmBatchProcessor} from '@subsquid/evm-processor'

const ACCOUNT_ADDRESS = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'.toLowerCase()

export const processor = new EvmBatchProcessor()
    .setGateway('https://v2.archive.subsquid.io/network/ethereum-mainnet')
    .setRpcEndpoint({
        url: 'https://eth-mainnet.public.blastapi.io',
        rateLimit: 10
    })
    .setFinalityConfirmation(75)
    .setFields({
        transaction: {
            from: true,
            value: true,
            hash: true,
            input: true,
        },
    })
    // Txs sent to vitalik.eth
    .addTransaction({
        to: [ACCOUNT_ADDRESS],
    })
    // Txs sent from vitalik.eth
    .addTransaction({
        from: [ACCOUNT_ADDRESS],
    })
