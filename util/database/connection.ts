import serverlessMySQL from "serverless-mysql";

const connection = serverlessMySQL({
    config: {
        host: process.env.DATABASE_URL,
        user: process.env.DATABASE_ID,
        password: process.env.DATABASE_SECRET,
        database: process.env.DATABASE_NAME,
        multipleStatements: true
    }
});

export default connection;
