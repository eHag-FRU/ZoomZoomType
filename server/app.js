const express = require('express')
const app = express();
const routes = require("./routes")

//Define the port for the API
const port = 3000;

//Make the first endpoint
app.use('/api', routes);

//Use the JSON parser, this is needed
app.use(express.json());

//Run the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});