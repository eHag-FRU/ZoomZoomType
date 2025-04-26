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

//The call for this would look like: const response = await axios.post("http://localhost:3000/api/createAccount", formData);
router.post("/createAccount", (req, res) => {
    console.log("Creating an account!!!");

    //Grab the email, password and username
    let email = null;
    let password = null;
    let userName = null;

    if (req.body.email) {
        email = req.body.email
    } else {
        throw "createAccount: email can not be null"
    }

    if (req.body.password) {
        password = req.body.password
    } else {
        throw "createAccount: password can not be null"
    }

    if (req.body.userName) {
        userName = req.body.userName
    } else {
        throw "createAccount: userName can not be null"
    }


    //Send the query
    try {
        queries.createUserAccount(userName, email, password);
    } catch (e) {
        console.log(`createAccount ERROR: ${e}`);
        res.sendStatus(500);
    }

    //Send an OK HTTP response, account was created
    res.sendStatus(200);
});



//Post call will look like const response = await axios.post("http://localhost:3000/api/postNewGame", {userID: 1, wpm: 45, time: 4.0, mode: 1, quoteID: 1})

router.post("/postNewGame", (req,res) => {
    //Will need the userID, wpm, time, and game mode int
    console.log(`postNewGame : ${req.data}`);


    //Grab the userID, wpm, time and game mode int
    const userID = req.body.userID;
    const wpm = req.body.wpm;
    const time = req.body.time;
    const mode = req.body.mode;
    const quoteID = req.body.quoteID;

    //Enusre no null's are given
    if (userID == null) {
        throw "postNewGame: userID can not be null";
    } else if (wpm == null) {
        throw "postNewGame: wpm can not be null";
    } else if (time == null) {
        throw "postNewGame: time can not be null";
    } else if (mode == null) {
        throw "postNewGame: mode can not be null";
    } else if (mode == 3 && quoteID == null) {
        throw "postNewGame: quoteID can not be null when the quotes game mode is played";
    }


    //Now make the db call to the leader board
    if (mode == 3) {
        //Only for the quotes game mode
        queries.addScoreToDatabase(userID, wpm, mode, time, quoteID);

    } else {
        //Any other game mode other than Quotes
        queries.addScoreToDatabase(userID, wpm, mode, time);
    }


    //Now make a call to update the users profile total WPM and Games played
    queries.updateAvgWPMByUserID(userID, wpm);

    //Sent the call to the db properly!
    res.sendStatus(200); 

});


//
// GET
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

//Command will look like const result = await axios.get("http://localhost:3000/api/profileData", {"userID": user_id_here});
router.get("/profileData", (req, res) => {
    //Need to grab the userID from the request
    const userID = req.body.userID;

    //Ensure the useID is retrieved, this ensures the user is also logged in too
    if (userID == null) {
        throw "profileData: userID can not be null or has not been provided in the request's body";
    }



    //Now execute the query
    let result = queries.getProfileDataByID(userID);

    console.log(result);


    //Send an HTTP 200 OK and the data back
    res.status(200).send(result);
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

router.get("/gamesPlayed", (req, res) => {

    //Grab the users ID from the request
    const userID = req.query.ID

    console.log(`gamesPlayer: userID - ${userID}`);

    //Now query to grab the number of games played & total WPM
    gamesPlayed = queries.getGamesPlayedAndWPMByUserID(userID);

    console.log(`gamesPlayed in router: ${gamesPlayed}`);
    console.log(`gamesPlayed in router: ${gamesPlayed.gamesPlayed}`);

    //Send back the dictionary that is {gamesPlayed, wpmTotal}
    res.status(200).send(gamesPlayed)
});


//Call will be like this: const result = axios.get("http://localhost:3000/api/randomQuote")
//A dictonary 
router.get("/randomQuote", (req, res) => {
    console.log("Grabbing a random quote");

    let result = null;

    result = queries.getRandomQuote();


    //Now print it out and see the format of the result
    console.log(`randomQuote: ${result.quoteID}`);
    console.log(`randomQuote: ${result.quote}`);


    res.status(200).send(result);
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

    //Grab the username and ID from the form
    const newPassword = req.body.password;
    const userID = req.body.id;
 
     console.log(`routes.js new password: ${newPassword}`);
 
     //Now grab the cookie
     console.log("The updatePassword cookie: ", req.body.id);
 
     //Send request to db
     queries.updatePasswordByID(userID, newPassword);
 
 
     //Send a HTTP-200 to say everything was OK
     res.sendStatus(200);


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


router.get("/leaderboard", (req, res) => {
    console.log("Grabbing leaderboard info");

    //Grab the game mode
    const gameMode = req.query.mode;

    console.log(`gameMode: ${gameMode}`);

    //Now send it to the DB for processing
    const result = queries.getLeaderBoardResults(gameMode);

    res.status(200).json(result);
});

router.get("/quotes", (req,res) => {
    console.log("Grabbing the quotes");

    //Now grab all of the quotes in the DB
    const result = queries.getAllQuotes();

    res.status(200).send(result);
});

router.get("/quoteleaderboard", (req, res) => {
    console.log("in /quoteleaderboard");

    //Now pull the quoteID from the request
    const quoteID = req.query.quote

    console.log(`The quote id to get the leaderboard for: ${quoteID}`);

    //Now take that and send it to the DB to get the quote leaderboard
    results = queries.getQuoteLeaderBoardByID(quoteID);

    res.status(200).send(results);
});


//export the module to import into the app
module.exports = router;