Zoom Zoom Type


How to run

* The project is ran in 2 parts, the client and the server, and there are two ways to run the project


* First Way: Client & Server Separate

    * Client
        * Before running:
            * Navigate to the client folder in a terminal, run npm i to install all dependencies needed

        * To run:
            * Run ```npm run dev``` to run the frontend locally

            * The site is hosted on ```http://localhost:5173```


    * Server:
        * Before running:
            * Navigate to the server folder in a terminal, run npm i to install all dependencies needed

        * To run:
            * Run the following to run the backend locally
                * ```node app.js```
                * The server is hosted on ```http://localhost:3000```

        * NOTE: The database is SQLite and is serverless, so no database server is needed


* Second Way: Server Serves Both Frontend and Backend
    * Building Client:
        * Navigate to the client folder in a terminal and   run:
            ```npm run build```
    * Running the application with the server
        * Navigate to the server folder in a terminal
            * To run the application, run the following command: ```node app.js```

            * To connect to navigate to the site, it is hosted at ```http://localhost:3000``` 