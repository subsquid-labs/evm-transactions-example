import {EvmBatchProcessor} from '@subsquid/evm-processor'
import {TypeormDatabase} from '@subsquid/typeorm-store'
import {lookupArchive} from '@subsquid/archive-registry'
import {Transaction} from './model'

const processor = new EvmBatchProcessor()
    .setDataSource({
        archive: lookupArchive('eth-mainnet'),
    })
    // Txs sent to vitalik.eth
    .addTransaction(['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'], {
        data: {
            transaction: {
                from: true,
                value: true,
                hash: true,
                input: true,
                status: true,
            },
        },
    })
    // Txs sent from vitalik.eth
    .addTransaction([], {
        from: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        data: {
            transaction: {
                from: true,
                value: true,
                hash: true,
                input: true,
                status: true,
            },
        },
    })

processor.run(new TypeormDatabase(), async (ctx) => {
    let transactions: Transaction[] = []

    for (let block of ctx.blocks) {
        for (let item of block.items) {
            if (item.kind !== 'transaction') continue

            transactions.push(
                new Transaction({
                    id: item.transaction.id,
                    block: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    from: item.transaction.from,
                    to: item.transaction.to,
                    hash: item.transaction.hash,
                    input: item.transaction.input,
                    success: Boolean(item.transaction.status),
                })
            )
        }
    }

    await ctx.store.insert(transactions)
})
