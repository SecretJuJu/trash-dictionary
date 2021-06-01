
const config = {
    JWT_SECRET: process.env.JWT_SECRET || "secretjuju",
    SECRETKEYS: process.env.SECRETKEYS || "secretjuju",
    DB_CONFIG: {
        DB_HOST: process.env.DB_HOST || "localhost",
        DB_NAME: (process.env.NODE_ENV === "test")? "trash_dictionary_api_test"
            :process.env.DB_NAME || "trash_dictionary_api",
        DB_USER_NAME: process.env.DB_USER || "trash_dictionary",
        DB_PASSWORD: process.env.DB_PASSWORD || "trash_dictionary",    
    }
}

export default config
