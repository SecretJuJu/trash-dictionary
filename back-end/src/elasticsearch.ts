import env from 'config/env'
import { Client } from '@elastic/elasticsearch'

const client = new Client({ node: env.ES_CONFIG.ES_URL })

export const searchWithKeyword = async ( keyword: string ) => {

    try {
        const result = await client.search({
            index: env.ES_CONFIG.ES_INDEX,
            size: 10,
            body: {
                query: {
                    match: {
                        content: keyword
                    }
                },
                analyzer: 'nori'
            }
        })
        return result
    } catch (err) {
        console.log(err)
        return null
    }
}