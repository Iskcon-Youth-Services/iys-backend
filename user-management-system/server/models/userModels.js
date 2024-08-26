const client = require('../config/db');
const { promisify } = require('util');
const bcrypt = require('bcrypt');

client.connect();

const promise_connection = promisify(client.query).bind(client);

const getUsers = async () => {
    let query = "SELECT * FROM users";
    return await promise_connection(query);
};

const signupUsers = async (req) => {
    const query = "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *;";
    const hashedPassword = await bcrypt.hash(req.password, 10);  // Hashing the password
    const values = [req.username, hashedPassword, req.email];
    console.log(values);

    try {
        const result = await promise_connection(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error executing query', error.stack);
        throw error;
    }
};

const loginUser = async (username, password) => {
    const query = 'SELECT * FROM users WHERE username = $1;';
    const values = [username];

    try {
        const res = await promise_connection(query, values);
        if (res.rows.length === 0) {
            throw new Error('Username not found');
        }

        const user = res.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);  // Comparing the hashed password
        if (!isMatch) {
            throw new Error('Incorrect password');
        }

        console.log('Login successful:', user);
        return user;
    } catch (err) {
        console.error('Login failed:', err.message);
        throw err;
    }
};
const submitSadhanaForm = async (req) => {
    const query = "INSERT INTO SadhanaFormScore (date,username,nidratobedscore,nidrawakeupscore,nidradaysleepscore,japascore,pathan,sravan) VALUES ($1, $2, $3,$4,$5,$6,$7,$8) RETURNING *;";
   
    const values = [new Date(),req.username,req.nidraToBedScore, req.nidraWakeUpScore,req.nidraDaySleepScore,req.japaScore,req.pathan,req.sravan];
    console.log(values);

    try {
        const result = await promise_connection(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error executing query', error.stack);
        throw error;
    }
};
const getSadhanaReport = async (input) => {
    let query = "SELECT * FROM sadhanaformscore where username = $1  AND date BETWEEN $2 AND $3;";
    return await promise_connection(query,input);
};

module.exports = { getUsers, signupUsers, loginUser,submitSadhanaForm ,getSadhanaReport};
