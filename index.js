const express = require('express');
const app = express();
const router = express.Router();
const Sequelize = require('sequelize');
const config = require('./config/database');
const path = require('path');
const authentication = require('./routes/authentication')(router);
const bodyParser = require('body-parser');
const cors = require('cors');


// Setting up the connection to database
/*const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to database: ' + config.database);
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });*/

// Models
const models = require("./Models");

// Sync Database
models.sequelize.sync().then(function(){
	console.log('Connected to the database');

}).catch(function(err){
	console.log(err, "Something went wrong with the Database update");
});


// Middlewares

// for cross-domain servers (running on different ports)
app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(bodyParser.urlencoded({ extended: false }))   // parse application/x-www-form-urlencoded
app.use(bodyParser.json())    // parse application/json
//app.use(express.static(__dirname + '/client/dist/')); // Provide static directory for front-end
app.use('/authentication', authentication);


// Connect Server to Angular2 index.html
app.get('*', (req, res) => {
	//res.sendFile(path.join(__dirname + '/client/dist/index.html'));
  res.send('Handler for every url');
});

app.listen(8080, () => {
	console.log('Listening on port: 8080');
});