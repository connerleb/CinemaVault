// add the required modules
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const axios = require('axios');


const app = express(); // setup express

// set the port and host
const PORT = 8080;
const HOST = '0.0.0.0';

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// create the connection to the database
const db = mysql.createConnection({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    port: process.env.MYSQL_ADDON_PORT || 3306,
});

// connect to the database
db.connect((err) => {
    if (err) {
        console.error("Database connection failed: ", err);
        process.exit(1);
    } else {
        console.log("Connected to the database");
        createTables();
    }
});


const createTables = async() => {
    const  promise = db.promise();

    try {
        // create the table for users
        await promise.query(
            `CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(255) NOT NULL
            )`,
        );

        console.log("Successfully created user table");

        // create the table for movies
        await promise.query(
            `CREATE TABLE IF NOT EXISTS movies (
            id INT PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(255) NOT NULL,
            release_year YEAR NOT NULL,
            description TEXT NOT NULL,
            poster_url VARCHAR(255) NOT NULL
        )`
        );

        console.log("Successfully created movie table");

        // create the table for ratings
        await promise.query(
            `CREATE TABLE IF NOT EXISTS ratings (
            id INT PRIMARY KEY AUTO_INCREMENT,
            user_id INT NOT NULL,
            movie_id INT NOT NULL,
            rating DECIMAL(2,1) NOT NULL,
            review VARCHAR(1000) NOT NULL,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (movie_id) REFERENCES movies(id)
        )`,
        );

        console.log("Successfully created rating table");

        app.listen(PORT, HOST);
        console.log("The server is running!");

    } catch (err) {
        console.error("Error creating tables ", err);
        process.exit(1); // exit if tables cannot be created
    }
}


app.post('/postuser',async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;


    const [existing] = await db.promise().query("SELECT * FROM users WHERE username = ?", [username]);
    if (existing.length > 0) {
        return res.send("The username already exists");
    }

    db.query(
        "INSERT INTO users(username, password, role) VALUES (?,?, ?)",
        [username, password, "newbie"],

        (err) => {
            if (err) {
                return res.status(400).json({error: "Username already exists"});
            }
            res.json({success: true, username: username});
        }
    );

});

app.post('/login',async (req, res) => {
    // get the image url from the user and the parent id
    let username = req.body.username;
    let password = req.body.password;


    const [users] = await db.promise().query("SELECT * FROM users WHERE username = ?", [username]);
    if (users.length <= 0) {
        return res.send("The username does not exist");
    }

    const user = users[0];

    if (password !== user.password){
        return res.send("Invalid password");
    }

    res.json({success: true, username: username});
});


app.post('/deleteuser',async (req, res) => {
    let username = req.body.username;

    const [existing] = await db.promise().query("SELECT * FROM users WHERE username = ?", [username]);

    // if the username exists
    if (existing.length > 0) {
        try {
            await db.promise().query(
                "DELETE FROM users WHERE username = ?",
                [username],
            );
            res.json({success: true, username: username});
        }
        catch (error) {
            return res.send("Error deleting user: " + error);
        }
    }
    else{
        return res.send("Error user ID does not exist");
    }

});

// api request to search for the movie
app.get('/api/search', async (req, res) => {
    const query = req.query.query;
    const apiKey = process.env.TMDB_API_KEY;

    try{
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
                query: query,
                api_key: apiKey,
            }
        });

        res.json(response.data.results);
    } catch(err) {
        return res.status(500).json({error: err});
    }
});

// get info about the user to display on the profile
app.get('/userinfo/:username', async (req, res) => {
    const username = req.params.username;

    try{
        const [rows] = await db.promise().query("SELECT username, role FROM users WHERE username = ?", [username]);
        if (rows.length === 0){
            return res.status(404).json({error: "Username does not exist"});
        }
        res.json(rows[0]);
    } catch(err) {
        return res.status(500).json({error: err});
    }
});

// endpoint to change the username
app.put('/userinfo/:username/change-username', async (req, res) => {
    const username = req.params.username;
    const {newUsername} = req.body;

    try {
        const [taken] = await db.promise().query(
            "SELECT * FROM users WHERE username = ?",
            [newUsername]
        );

        if (taken.length > 0 && newUsername !== username){
            return res.status(400).json({error: "Username already taken"});
        }

        await db.promise().query(
            "UPDATE users SET username = ? WHERE username = ?",
            [newUsername, username]
        );

        res.json({success: true, username: newUsername});
    } catch(err) {
        res.status(500).json({error: "Could not update username: " + err})
    }
});

// endpoint to change the password
app.put('/userinfo/:username/change-password', async (req, res) => {
    const username = req.params.username;
    const {newPassword} = req.body;

    try {
        await db.promise().query(
            "UPDATE users SET password = ? WHERE username = ?",
            [newPassword, username]
        );

        res.json({success: true});

    } catch(err) {
        res.status(500).json({error: "Could not update password: " + err})
    }
});

app.post('/verify-password', async (req, res) => {
    const {username, password} = req.body;

    try{
        const [rows] = await db.promise().query("SELECT password FROM users WHERE username = ?", [username]);
        if (rows.length === 0){
            return res.status(404).json({error: "Username does not exist"});
        }

        if (rows[0].password === password){
            return res.json({valid: true});
        }
        else{
            return res.json({valid: false})
        }
    } catch(err) {
        return res.status(500).json({error: err});
    }
});

