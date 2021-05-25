const swaggerDefinition = {
    info: {
        title: "trash-dictionary-api",
        version: "1.0.0",
        description: "Backend REST API server",
        contact: {
            name: "Ji SeungBo",
            email: "dev.tmdqh@gmail.com",
            facebook_messages: "https://www.facebook.com/profile.php?id=100041042641605"
        },
    },
    basePath: "/",
}

const options = {
    swaggerDefinition,
    apis: [`./${process.env.NODE_PATH}app/*/routes.ts`],
}

export default options
