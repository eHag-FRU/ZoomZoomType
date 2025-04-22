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




//
//  GET
//
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

router.get("/gamesPlayed", (res, req) => {

    //Grab the users ID from the request
    const userID = res.body.ID

    //Now query to grab the number of games played & total WPM
    gamesPlayed = queries.getGamesPlayedAndWPMByUserID(userID);

    //Send back the dictionary that is {gamesPlayed, wpmTotal}
    res.statusCode(200).send(gamesPlayed)
});

//
// Profile commands
//

router.delete('/deleteaccount', (req,res) => {
    console.log("Going to delete account");

    //Now grab the cookie with Express Cookies
    //going to delete the cookie after making the DB call to remove the collumn
    //The ID will be pulled from the cookie
    console.log("The cookie: ", req.body.id);

    const userIDToDelete = req.body.id;

    //Now make the call to the db
    queries.deleteUserByID(userIDToDelete);


    //Delete was good, so send a 200 OK
    res.sendStatus(200);
});

router.post('/updateUsername', (req, res) => {
    console.log("Going to update the username");

    //Grab the username and ID from the form
    const newUserName = req.body.username;
    const userID = req.body.id;

    console.log(`routes.js new username: ${newUserName}`);

    //Now grab the cookie
    console.log("The updateUsername cookie: ", req.body.id);

    //Send request to db
    queries.updateUserNameByID(userID, newUserName);


    //Send a HTTP-200 to say everything was OK
    res.sendStatus(200);

});

router.post('/updatePassword', (req, res) => {
    console.log("Going to update the password");


});

router.post('/updateEmail', (req, res) => {
    console.log("Going to update the email");

    //Grab the cookie for the ID
    const userIDToUpdateEmail = req.body.id;

    //Grab the email from the form component to send to the DB
    const newUserEmail = req.body.email;

    console.log(`newUserEmail: ${newUserEmail}`);
    console.log(`userIDToUpdateEmail: ${userIDToUpdateEmail}`);


    //Now make the db call
    queries.updateEmailByID(userIDToUpdateEmail, newUserEmail);

    //Send an HTTP 200 - OK, signaling the request was executed successfully
    res.sendStatus(200);
});


//export the module to import into the app
module.exports = router;