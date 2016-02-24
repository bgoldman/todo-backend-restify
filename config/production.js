module.exports = {
    "server": {
        "api_root":    "http://todo-backend-restify.heroku.com",
        "environment": "production",
        "port":        process.env.PORT
    },
    "database": {
        "connection": {
            "engine": "postgres",
            "url":    process.env.DATABASE_URL,
        },
        "pool": {
            "max":  5,
            "min":  1,
            "idle": 10000
        }
    }
};
