const express = require('express');
const bodyParser = require('body-parser');
const app = express();


// call Joi for authotication
const Joi = require('joi');

// call express to json objects
app.use(express.json());
// Require different routes
const routesMeetup  = require('../js/routes/meetups');
app.use(routesMeetup)
const router = require('../js/routes/users');
app.use(router)
const routesQuestions  = require('../js/routes/questions');
app.use(routesQuestions)
const routesRSVP  = require('../js/routes/rsvp');
app.use(routesRSVP);
/*Global End point 
=========================================================================== */
//Root of Endpoint for all users
app.get('/questioner.com', (req, res)=> {
    res.status(200).send({ message: 'You have not made any request'})
});
/* General Page Return error
============================================================================== */
// check on wrong input
app.all('*', (req, res) => {
    res.status(404).send({message: "Page not found"});
});
module.exports = app;

