const express = require('express');
const router = express.Router();
const session = require('cookie-session');
const queries = require('./DB/queries');
const {check, validationResults, matchedData} = require('express-validator');
const { query } = require('./DB/db');

//Add middleware to the router, so the form data can be processed
router.use(express.urlencoded({extended: true}));
router.use(express.json());


//Now define the routes

//
//  POST requests
//
router.post('/login', (req, res, next) => {
    console.log(req.body.email);
    //console.log(req.body.password);

    //sanatize, ensure its not empty, trim white space, escape and normalize the email
    check('email').notEmpty().trim().isEmail().escape().normalizeEmail()



    //Grab the data
    const data = matchedData(req);

    console.log(`req: ${req.body.email}`);
    console.log(`Data: ${data.body}`);


    //connect and query the db
    correctPassword = queries.getPasswordByEmail(req.body.email);
    console.log("matchedData email: " + matchedData(req).email);
    
    //Create a cookie since the log in is correct
    if (req.body.password === correctPassword) {
        console.log("Password is correct!!");

        //grab the usr id
        const usrID = queries.getUserIDByEmail(req.body.email);

        //grab the usr name
        const usrName = queries.getUserNameByID(usrID);

        console.log(usrName);

        //Send a HTTP 200 status for OK and redirect to the homepage
        res.status(200).send({"userID": usrID, 'userName': usrName, 'userEmail': req.body.email});
    } else {
        console.log("Password is incorrect, or no account exists");
        //Send a HTTP 401 - Unauthorized access response
        res.sendStatus(401);
    }

    
});


// i think this will work lol

router.post('/register', async(req, res) => {
    const { userName, userEmail, password } = req.body;

    if (!userName || !userEmail || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required.' });
    }

    try {
        await queries.createUserAccount(userName, userEmail, password);
        res.status(201).json({ message: 'User account created successfully.' });
    } catch (error) {
        console.error('Error in /register route:', error);
        res.status(500).json({ error: 'Failed to create account.' })
    }
})

router.get('/logout', (res, req) => {
    //Check if there is a session
    currentLoggedInUser = req.session;

    if (currentLoggedInUser){
        //There is a user to log out, log them out
        currentLoggedInUser = null;

        //200 = successful
        req.redirect(200, "http://localhost:5173/")
    } else {

        //Now redirect to the login page
        req.redirect(401, "http://localhost:5173/");
    }
});


router.get("/getAvgWPM", (res, req) => {
    //Grab the users email
    userEmail = res.query.email;

    //Query the DB for the user id
    userID = queries.getUserIDByEmail(userEmail);

    //Now get the avg WMP from the database
    avgWPM = queries.getAvgWPMByUserID(userID);

    //Send the response back
    req.send({'avgWPM': avgWPM});
});


//export the module to import into the app
module.exports = router;