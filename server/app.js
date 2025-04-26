const express = require('express')
const app = express();
const path = require('path');
const routes = require("./routes")
var cookieParser = require('cookie-parser')

//Define the port for the API
const port = 3000;

//Make the first endpoint
app.use('/api', routes);

//Use the JSON parser, this is needed
app.use(express.json());

//Add the middleware to process cookies from the browser
app.use(cookieParser());

//Serve the static files from the client folder
app.use(express.static(path.join(__dirname + '/../client/dist')));



//Serve the files from the client folder to client
//Used for fallback non api routing /{*splat} is equivalent to saying * routes in express
//Needed for react router to work when reloading pages
app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

//Run the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});