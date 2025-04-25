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
    result = db.query("SELECT wpmTotal, gamesPlayed FROM avgWPM WHERE userID = ?;", [userID]);

    //Will hold the games played and the over all WPM
    gamesPlayed = 0;
    wpmTotal = 0;

    console.log(result[0].gamesPlayed);
    console.log(result[0]);

    try {
        gamesPlayed = result[0].gamesPlayed;
        wpmTotal = result[0].wpmTotal;
    } catch{
        throw `getGamesPlayedAndWPMByUserID: could not either assign gamesPlayed or wpmTotal: ${e}`;
    }

    return result[0];
}

function getLeaderBoardResults(gameMode) {
    //Will hold the top 10 results for the mode
    top10 = null;

    //Default is classic (1)
    let gameModeNumber = 1

    //Sets the game mode number, this will be passed to the DB query
    switch (gameMode) {
        case "Classic":
            gameModeNumber = 1;
            break;
        case "Memorize":
            gameModeNumber = 2;
            break;
        case "Quotes":
            gameModeNumber = 3;
            break;
        case "Look-Ahead":
            gameModeNumber = 4;
            break;
    }

    console.log(`getLeaderBoardResults: gameMode: ${gameMode} | gameModeNumber: ${gameModeNumber}`);

    //Now we need to make the DB call based on the game mode, if the game mode is not 3
    if (gameMode != 3) {
        top10 = db.query("SELECT users.userUsername, wpm, time FROM leaderBoard JOIN users ON leaderBoard.userID = users.userID WHERE mode = ? ORDER BY wpm DESC LIMIT 10;", [gameModeNumber]);
    }

    return top10;
}


function getAllQuotes() {
    //Will hold the results
    let results = null;


    //Now send query over
    result = db.query("SELECT * FROM quotes;");

    console.log(`getAllQuotes result: ${result[0]}`);
    console.log(`getAllQuotes result: ${result[1]}`);

    //Now return it
    return result;
}

function getQuoteLeaderBoardByID(quoteID) {
    console.log("Getting quote leaderboard by the quoteID");

    //Now make the DB query to get the leaderboard based on quote ID
    let result = null;

    result = db.query("SELECT users.userUsername, wpm, TIME  FROM leaderBoard JOIN users ON leaderBoard.userID = users.userID JOIN quotes ON leaderBoard.quoteID = quotes.quoteID  WHERE mode = 3 AND leaderBoard.quoteID = ? ORDER by wpm DESC LIMIT 10;", [quoteID]);

    return result;
}

function getRandomQuote() {
    console.log("Getting random quote and quote ID");

    let result = db.query("SELECT  * FROM quotes ORDER BY RANDOM() LIMIT 1;", []);
    result = result[0];

    console.log(`getAllQuotes: result = ${result}`);

    return result;
}


//
// UPDATE
//
function updateAvgWPMByUserID(userID, gamesWPM){
    if (userID == null){
        console.log("updateAvgWPMByUserID: userID can not be null");
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

    console.log(`updateAvgWPMByUserID, userID: ${userID} | wpmTotal: ${newResultWPM}`);

    try {
        newGamesPlayed = result[0].gamesPlayed;
    } catch {
        throw "updateAvgWPMByUserID: Could not get gamesPlayed from the SQL Database Query";
    }



    //Update the values
    newGamesPlayed++;
    newResultWPM += gamesWPM;

    //Now write an update query
    db.noReturnQuery("UPDATE avgWPM SET wpmTotal = ?, gamesPlayed = ? WHERE userID = ?;", [newResultWPM, newGamesPlayed, userID]);
}


function updateUserNameByID(ID, newUserName) {
    console.log("Updating username by ID with DB");


    //Check for NULL ID
    if (ID == null) {
        throw "updateUserNameByID: ID can not be null";
    } else if (newUserName == null) {
        throw "updateUserNameByID: newUserName can not be null"
    }

    //Now make the update query
    db.noReturnQuery("UPDATE users SET userUsername = ? WHERE userID = ?;", [newUserName, ID]);
}

function updateEmailByID(ID, newEmail) {
    console.log("Updating email by ID with DB");

    //Check for NULL id and email
    if (ID == null) {
        throw "updateEmailByID: ID can not be null";

    } else if (newEmail == null) {
        throw "updateEmailByID: newEmail can not be null";
    }



    //Make call to DB to update info
    db.noReturnQuery("UPDATE users SET userEmail = ? WHERE userID = ?;", [newEmail, ID]);
}

function updatePasswordByID(ID, newPassword) {
    console.log("Updating password by ID with DB");

     //Check for NULL id and email
     if (ID == null) {
        throw "updatePasswordByID: ID can not be null";

    } else if (newPassword == null) {
        throw "updatePasswordByID: newPassword can not be null";
    }



    //Make call to DB to update info
    db.noReturnQuery("UPDATE users SET userPassword = ? WHERE userID = ?;", [newPassword, ID]);
}


function addScoreToDatabase(userID, wpm, mode, time, quoteID=null) {
    //Send this to the database, this is any mode
    //BUT NOT QUOTE (3)
    if (quoteID == null && mode != 3) {
        db.noReturnQuery("INSERT INTO leaderBoard (userID, wpm, mode, time) VALUES (?, ?, ?, ?);", [userID, wpm, mode, time]);
    } else {
        //This is quoted insert!
        db.noReturnQuery("INSERT INTO leaderBoard (userID, wpm, mode, time, quoteID) VALUES (?, ?, ?, ?, ?);", [userID, wpm, mode, time, quoteID]);
    }
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
    db.noReturnQuery("INSERT INTO users (userUsername , userEmail , userPassword) VALUES (?, ?, ?);", [userName, userEmail, password]);

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
    db.noReturnQuery("INSERT INTO avgWPM (wpmTotal, userID, gamesPlayed) VALUES (?, ?, ?);", [0, userID, 0]);

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
    addScoreToDatabase,
    getGamesPlayedAndWPMByUserID,
    getLeaderBoardResults,
    deleteUserByID,
    createUserAccount,
    updatePasswordByID,
    updateEmailByID,
    updateUserNameByID,
    getQuoteLeaderBoardByID,
    getAllQuotes,
    getRandomQuote
}