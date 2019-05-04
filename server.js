
// load express module
const express = require('express');
// create instance of server
const app = express();
const PORT = process.env.PORT || 8080;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Use the express.static middleware to serve static content for the app from the "public" directory in the application directory.
app.use(express.static("./app/public"));
require('./app/routing/apiRouting')(app)
require('./app/routing/htmlRouting')(app)









app.listen(PORT, () => {
   console.log('listening on port: ' + PORT);
});

