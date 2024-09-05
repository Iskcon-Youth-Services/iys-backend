

module.exports = {
    flywayArgs: {
    url: 'jdbc:postgresql://localhost:5432/IYS_Users',
    user: 'postgres',
    password: '123',
    schemas: ['public'],
    locations: ['filesystem:./server/migrations']
    }
};
