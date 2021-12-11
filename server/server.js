const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

var corsOptions = {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:8081"
};

console.log("🚀 ~ file: server.js ~ line 10 ~ process.env.CLIENT_ORIGIN", process.env.CLIENT_ORIGIN)


const path = __dirname + '/app/views/';

app.use(express.static(path));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
    initial();
});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to fullstack-server-side application." });
});


// Auth routes
require('./app/routes/auth.routes')(app);
// User routes
require('./app/routes/user.routes')(app);

// Tutorial routes
require("./app/routes/turorial.routes")(app);
// set port, listen for requests

app.get('/', function (req, res) {
    res.sendFile(path + "index.html");
});
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
