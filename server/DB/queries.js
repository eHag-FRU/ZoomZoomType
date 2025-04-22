const db = require('./db');
const {check, validationResult } = require('express-validator');


//
// READ/GET
//

//Assumed to already be sanitized by the backend before being sent to query
function getPasswordByEmail(email) {
    if (email == null) {
        //No email was given, so return false
        return null;
    }

    //There is an email, so query the database to check
    result = db.query('SELECT userPassword FROM users WHERE userEmail == ?;', [email]);

    //Return the first result (only result) and the userPassword value from the returned dictionary
    pass = null;
    
    try {
        //Try to grab the password from the result
        pass = result[0].userPassword;
    } catch {
        //No password was found, so set null
        pass = null;
    }

    return pass;
}


function getUserIDByEmail(email) {
    if (email == null) {
        //No email was given, so return false
        return null;
    }

    //There is an email, so query the database to check
    result = db.query('SELECT userID FROM users WHERE userEmail == ?;', [email]);

    //Return the first result (only result) and the userPassword value from the returned dictionary
    id = null;
    
    try {
        //Try to grab the password from the result
        id = result[0].userID;
    } catch {
        //No password was found, so set null
        id = null;
    }

    return id;
}


function getUserNameByID(userID) {
    //Check if userID is null
    if (userID == null) {
        return;
    }


    //Now execute the query 
    result = db.query("SELECT userUsername FROM users WHERE userID = ?;", [ userID ]);

    usrName = null;

    try{
        usrName = result[0].userUsername;
    }catch{
        throw "getUserNameByID: Could not get the user's username from the SQL Database Query";
    }

    return usrName;

}

function getAvgWPMByUserID(userID) {
    //check if the userID is null
    if (userID == null) {
        return;
    }

    //Now query the db based on the userID
    result = db.query("SELECT wpmTotal/gamesPlayed as average FROM avgWPM WHERE userID = ?;", [userID]);

    avg = null;

    try{
        avg = result[0].average;
    }catch{
        throw "getAvgWPMByUserID: Could not get average from the SQL Database Query";
    }

    return avg;

}

function getGamesPlayedAndWPMByUserID(userID) {

    //check for null userID
    if (userID == null) {
        throw "getGamesPlayedAndWPMByUserID: userID can not be null";
    }

    //Good to go, now grab the users WPM and games played by their userID
    result = db.query("SELECT wpmTotal, gamesPlayed FROM avgWPM WHERE userID = ?;" [userID]);

    //Will hold the games played and the over all WPM
    gamesPlayed = 0;
    wpmTotal = 0;

    try {
        gamesPlayed = result[0].gamesPlayed;
        wpmTotal = result[0].wpmTotal;
    } catch (e) {
        throw `getGamesPlayedAndWPMByUserID: could not either assign gamesPlayed or wpmTotal: ${e}`;
    }

    return {"gamesPlayed": gamesPlayed, "wpmTotal": wpmTotal};
}


//
// UPDATE
//
function updateAvgWPMByUserID(userID, gamesWPM){
    if (userID == null){
        return null;
    }

    //variables to hold the new values to write to the database
    newGamesPlayed = 0;
    newResultWPM = 0;

    //Get the current WPM and game count
    result = db.query("SELECT wpmTotal, gamesPlayed from avgWPM WHERE userID = ?;", [userID]);


    //Now assign the query results to each respective updated variable
    try{
        newResultWPM = result[0].wpmTotal;
    } catch {
        throw "updateAvgWPMByUserID: Could not get wmpTotal from the SQL Database Query";
    }

    try {
        newGamesPlayed = result[0].gamesPlayed;
    } catch {
        throw "updateAvgWPMByUserID: Could not get gamesPlayed from the SQL Database Query";
    }

    //Update the values
    newGamesPlayed++;
    newGamesPlayed += gamesWPM;

    //Now write an update query
    db.query("UPDATE avgWPM SET wpmTotal = ?, gamesPlayed = ? WHERE userID = ?;", [newResultWPM, newGamesPlayed, userID]);
}


function updateUserNameByID(ID, newUserName) {
    //Check for NULL ID
    if (ID == null) {
        throw "updateUserNameByID: ID can not be null";
    } else if (newUserName == null) {
        throw "updateUserNameByID: newUserName can not be null"
    }

    //Now make the update query
    db.query("UPDATE users SET userUsername = ? WHERE userID = ?;", [newUserName, ID]);
}

function updateEmailByID(ID, newEmail) {

}

function updatePasswordByID(ID, newPassword) {
    
}

//
//  CREATE
//

function createUserAccount(userName, userEmail, password) {
    //Password is already assumed to be confirmed to be the same

    //Null checks
    if (userName == null) {
        throw "createUserAccount: userName can not be null";
    } else if (userEmail == null) {
        throw "createUserAccount: userEmail can not be null";
    } else if (password == null) {
        throw "createUserAccount: password can not be null";
    }

    //Create the user account
    db.query("INSERT INTO users (userUsername , userEmail , userPassword) VALUES (?, ?, ?);", [userName, userEmail, password]);

    //Holds the userID of the new account to make an entry into the avgWPM table
    userID = null;

    userIDResult = db.query("SELECT userID FROM users WHERE userEmail = ?", [userEmail]);

    //Try to assign it to the userID variable
    try {
        userID = userIDResult[0].userID;
    } catch {
        throw "createUserAccount: Can not grab the userID of the newly created account from the database";
    }

    //Now that its assigned, create a new entry with 0's for wpmTotal and gamesPlayed to it for the user
    db.query("INSERT INTO avgWPM (wpmTotal, userID, gamesPlayed) VALUES (?, ?, ?);", [0, userID, 0]);
}

//
// DELETE
//

function deleteUserByID(ID) {

    //Check for NULL ID
    if (ID == null) {
        throw "deleteUserByID: ID can not be null";
    }

    //Now good to execute the query
    try {
        db.deleteQuery("DELETE FROM users WHERE userID = ?;", [ID]);
    } catch (e) {
        console.log(`deleteUserByID: ${e}`);
    }

}

module.exports = {
    getPasswordByEmail,
    getUserIDByEmail,
    getAvgWPMByUserID,
    updateAvgWPMByUserID,
    getUserNameByID,
    deleteUserByID,
    updateUserNameByID
}