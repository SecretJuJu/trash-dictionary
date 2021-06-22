import env from 'config/env'
import { Client } from '@elastic/elasticsearch'

const client = new Client({ node: env.ES_CONFIG.ES_URL })

export interface searchOptions {
    from: number
}

export const searchWithKeyword = async ( keyword: string, options?: searchOptions ) => {
    const searchSize: number = parseInt(env.ES_CONFIG.ES_SEARCH_SIZE)
    try {
        const result = await client.search({
            index: env.ES_CONFIG.ES_INDEX,
            size: searchSize,
            from: options?.from? options.from: 0,
            body: {
                query: {
                    query_string: {
                        query: keyword,
                        analyzer: "korean"
                    }
                },
                filter: {
                    
                }
            }
        })
        return result
    } catch (err) {
        console.log(err)
        return null
    }
}