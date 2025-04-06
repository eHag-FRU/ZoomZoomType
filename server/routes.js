const express = require('express');
const router = express.Router();
const session = require('cookie-session');

//Add middleware to the router, so the form data can be processed
router.use(express.urlencoded({extended: true}));

//Add session cookies to allow for users to stay logged in
router.use(session({
    name: 'session',
    keys: ['key1', 'key2'],
    cookie: {
        secure: true,
        httpOnly: true
    }
}));

//Now define the routes

//
//  POST requests
//
router.post('/login', (req, res, next) => {
    console.log(req.body.email);
    console.log(req.body.password);

    //Connect to the database

    //Check the password based on the email supplied

    let loginValid = true;

    //If matched, create a session cookie
    if (loginValid) {
        console.log("Valid login");
        req.session.user = {id: 2};
    }
    //Else, return a bad code

    //Send a HTTP 200 status for OK and redirect to the homepage
    res.redirect(200, "http://localhost:5173/")
    next();
});

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


router.get('/checkLoginStatus', (req, res) => {
    const user = req.session.user;
    
    if (user){
        console.log(`logged in as user ${user.id}`);
        res.send(`Logged in as user ${user.id}!`);
    } else {
        res.sendStatus(500);
    }
})



//export the module to import into the app
module.exports = router;