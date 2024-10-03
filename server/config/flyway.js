// require('dotenv').config();

// module.exports = {
//     flywayArgs: {
//     url:  process.env.DB_URL,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     schemas: ['public'],
//     locations: ['filesystem:./migrations']
//     }
// };


require('dotenv').config();

module.exports = {
    flywayArgs: {
        url: `jdbc:postgresql://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        schemas: ['public'],
        locations: ['filesystem:./migrations'],
        // baselineOnMigrate: true // Initialize the schema history table
    }
};
