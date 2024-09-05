const client = require('../config/db');
const { promisify } = require('util');
const bcrypt = require('bcrypt');

client.connect();

const promise_connection = promisify(client.query).bind(client);

const getUsers = async () => {
    let query = "SELECT * FROM userDetails";
    return await promise_connection(query);
};

const signupUsers = async (req) => {
    const query = "INSERT INTO userLogin (username, password, email) VALUES ($1, $2, $3) RETURNING *;";
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
    const query = 'SELECT * FROM userLogin WHERE username = $1;';
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
    const query = "INSERT INTO SadhanaScore (date,user_id,nidratobedscore,nidrawakeupscore,nidradaysleepscore,japascore,pathanscore,sravanscore,totalscore) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9) RETURNING *;";
   
    const values = [new Date(), req.user_id,req.nidraToBedScore, req.nidraWakeUpScore,req.nidraDaySleepScore,req.japaScore,req.pathanScore,req.sravanScore,req.total];
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
    let query = "SELECT * FROM sadhanascore where user_id = $1  AND date BETWEEN $2 AND $3;";
    return await promise_connection(query,input);
};


const submitUserDetails = async (userData) => {
    const {
        user_id, first_name, last_name, email, mobile, date_of_birth,
        address_line1, address_line2, city, state, postal_code,
        country, gender, profile_picture_url, bio
    } = userData;

    const query = `
        INSERT INTO userDetails (
            user_id, first_name, last_name, email, mobile, date_of_birth,
            address_line1, address_line2, city, state, postal_code,
            country, gender, profile_picture_url, bio
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,$15)
        RETURNING *;
    `;
    const values = [
        user_id, first_name, last_name, email, mobile, date_of_birth,
        address_line1, address_line2, city, state, postal_code,
        country, gender, profile_picture_url, bio
    ];

    try {
        const result = await promise_connection(query, values);
        return result.rows[0];  // Return the inserted user object
    } catch (err) {
        console.error('Error inserting user:', err);
        throw err;
    }
};


const updateUserDetails = async (userData) => {
    const {
        user_id, first_name, last_name, email, mobile, date_of_birth,
        address_line1, address_line2, city, state, postal_code,
        country, gender, profile_picture_url, bio
    } = userData;

    const query = `
    UPDATE userDetails
    SET 
        first_name = $2,
        last_name = $3,
        email = $4,
        mobile = $5,
        date_of_birth = $6,
        address_line1 = $7,
        address_line2 = $8,
        city = $9,
        state = $10,
        postal_code = $11,
        country = $12,
        gender = $13,
        profile_picture_url = $14,
        bio = $15,
        updated_at = CURRENT_TIMESTAMP
    WHERE user_id = $1
    RETURNING *;
`;

const values = [
    user_id, first_name, last_name, email, mobile, date_of_birth,
    address_line1, address_line2, city, state, postal_code,
    country, gender, profile_picture_url, bio
];

    try {
        const result = await promise_connection(query, values);
        return result.rows[0];  // Return the inserted user object
    } catch (err) {
        console.error('Error inserting user:', err);
        throw err;
    }
};

module.exports = { getUsers, signupUsers, loginUser,submitSadhanaForm ,getSadhanaReport ,submitUserDetails,updateUserDetails};
