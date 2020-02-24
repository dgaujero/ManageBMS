const express = require("express");
const mysql = require("mysql");
// const routes = require("./routes"); //from AJAX books
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.static("public")); //added from project-test
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") { //AJAX books
  app.use(express.static("client/build")); //AJAX books
}
// Add routes, both API and view
var routes = require("../admin-test/controllers/adminController"); //added from project-test
app.use(routes);

// Connect to mySQL DB
app.get('/members', (req, res) => { //added from project-test
    connection.connect();
    connection.query('SELECT * FROM membersTable', function(error, results) {
        if (!err) {
            res.send(results);
        } else {
            console.log('Error while performing Query.');
        }
    });
    connection.end();
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});











