const express = require('express');
const routesMeetup = express.Router();
// call Joi for authotication
const Joi = require('joi');

const data = require('./data');
const {meetups} = data;
/*---------------------------------------------------------------------------- */
/* Meetups End Points
================================================================================= */


// shows all meetups available
routesMeetup .route('/questioner.com/api/v1/meetups')
.get((req, res) => {
        res.send(meetups);
    })
// inserts a new meetup into the system,
.post( (req, res) => {
    const {error} = validateOrder(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    };
    const meetup = {
        id: meetups.length + 1,
        createdOn: req.body.createdOn,
        location: req.body.location,
        images: req.body.images,
        topic: req.body.topic,
        happeningOn: req.body.happeningOn,
        username: req.body.username,
        Tags: req.body.Tags,
    }
    meetups.push(meetup);
    res.send(meetup);
});

// Gets a specific meetup using the meetup ID
routesMeetup.route('/questioner.com/api/v1/meetups/:id')
.get( (req, res) => {
    const meetup = meetups.find(ele => ele.id === parseInt(req.params.id));
    if (!user) res.status(404).send('Username or password is incorect');
    res.send(meetup);
})
// updates the the exisitng list of user
.put( (req, res) => {
    const meetup = meetups.find(ele => ele.id === parseInt(req.params.id));
    if (!meetup) {
        res.status(404).send('No meetup selected');
        return;
    };
    const {error} = validateMeetup(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    };
    meetup.id = req.body.id,
    meetup.createdOn = req.body.createdOn,
    meetup.location = req.body.location,
    meetup.images = req.body.images,
    meetup.happeningOn = req.body.happeningOn,
    meetup.Tags = req.body.Tags, 
    res.send(meetup);
})
// deletes or removes any specified user
.delete( (req, res) => {
    const meetup = meetups.find(ele => ele.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).send('Nothing to delete');
        return;
    };
    const index = meetups.indexOf(meetup);
    meetups.splice(index, 1);
    res.send(meetup);
});

// using Joi to validate in this function
function validateMeetup(meetup) {
    const schema = {
        id: Joi.number().required(),
        createdOn: Joi.date().required(),
        location: Joi.string().min(2).required(),
        images: Joi.string().min(2).required(),
        happeningOn: Joi.date().required(),
        Tags: Joi.string().min(3).required(),
    };
    return Joi.validate(meetup, schema);
};

/* End of Meet up End points 
-----------------------------------------------------------------------------*/

module.exports = routesMeetup;