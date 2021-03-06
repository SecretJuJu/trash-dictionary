import dotenv from "dotenv"
import appRootPath from 'app-root-path'
dotenv.config()

const config = {
    
    DB_CONFIG: {
        DB_HOST: process.env.DB_HOST || "localhost",
        DB_NAME: (process.env.NODE_ENV === "test")? "trash_dictionary_api_test"
            :process.env.DB_NAME || "trash_dictionary_api",
        DB_USER_NAME: process.env.DB_USER || "trash_dictionary",
        DB_PASSWORD: process.env.DB_PASSWORD || "trash_dictionary",    
    },
    ES_CONFIG: {
        ES_URL: process.env.ES_URL || "http://localhost:9200",
        ES_INDEX: process.env.ES_INDEX || "trash_dictionary_es",
        ES_TYPE: process.env.ES_TYPE || "feed",
        ES_SEARCH_SIZE: process.env.ES_SEARCH_SIZE || "10"
    },
    APP_CONFIG: {
        JWT_SECRET: process.env.JWT_SECRET || "secretjuju",
        SECRETKEYS: process.env.SECRETKEYS || "secretjuju",
        FILEPATH: process.env.FILEPATH || appRootPath.path+'/public',
    }
}

export default config
