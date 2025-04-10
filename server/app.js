const express = require('express')
const app = express();
const path = require('path');
const routes = require("./routes")

//Define the port for the API
const port = 3000;

//Make the first endpoint
app.use('/api', routes);

//Use the JSON parser, this is needed
app.use(express.json());

//Serve the static files from the client folder
app.use(express.static(path.join(__dirname + '/../client/dist')));

//Serve the files from the client folder 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

//Run the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});