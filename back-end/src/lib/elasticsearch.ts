import { Client } from '@elastic/elasticsearch'
import env from 'config/env'

const esclient = new Client({ node: env.ES_CONFIG.ES_URL })

async function createIndex(index: string) {
    try {
      await esclient.indices.create({ index });
      console.log(`Created index ${index}`);
    } catch (err) {
      console.error(`An error occurred while creating the index ${index}:`);
      console.error(err);
    }
}




export default esclient