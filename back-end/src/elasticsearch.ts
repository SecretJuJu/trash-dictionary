import env from 'config/env'

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: env.ES_CONFIG.ES_URL })

export const searchWithKeyword = async ( keyword: string ) => {

    try {
        const result = await client.search({
            index: env.ES_CONFIG.ES_INDEX,
            body: {
              query: {
                match: { tags: keyword }
              }
            }
        })
        return result
    } catch (err) {
        console.log(err)
        return null
    }
}