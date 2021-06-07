
const Client = require('@elastic/elasticsearch')
const esclient = new Client({ node: "http://localhost:9200" })

esclient.ping().then(e => console.log("my ping \n\n",e))
console.log("==================")

esclient.search({
    index: 'trash_dictionary_es',
    type: 'feeds',
    body: {
        query: {
          match: {
            body: '폐트병은'
          }
        }
    }
}).then((response) => {
    for (const tweet of response.hits.hits) {
        console.log('tweet:', tweet);
    }
})