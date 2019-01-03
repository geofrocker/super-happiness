const express = require('express');
const routesQuestions = express.Router();
// call Joi for authotication
const Joi = require('joi');

// Require the data from data.js
const data = require('./data');
const {questions} = data;

/* Questions End Points
================================================================================= */
// shows all questions available
routesQuestions.route('/questioner.com/api/v1/questions')
.get((req, res) => {
        res.send(questions);
    })
// inserts a new question into the system,
.post( (req, res) => {
    const {error} = validateQuestion(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    };
    const question  = {
        id: questions.length + 1,
        createdOn: req.body.createdOn,
        createdBy: req.body.createdBy,
        meetup: req.body.meetup,
        title: req.body.title,
        body: req.body.body,
        votes: req.body.votes,
    }
    questions.push(question);
    res.send(question);
});
// Gets a specific question using the question ID
routesQuestions.route('/questioner.com/api/v1/questions/:id')
.get( (req, res) => {
    const question = questions.find(ele => ele.id === parseInt(req.params.id));
    if (!question) res.status(404).send({ invalid:'Username or password is incorect'});
    res.send(question);
})
// updates the the exisitng list of user
.put( (req, res) => {
    const question = questions.find(ele => ele.id === parseInt(req.params.id));
    if (!question) {
        res.status(404).send({ message: 'No Question currently'});
        return;
    };
    const {error} = validateQuestion(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    };
    question.id = req.body.id,
    question.createdOn = req.body.createdOn,
    question.createdBy = req.body.createdBy,
    question.meetup = req.body.meetup,
    question.title = req.body.title,
    question.body = req.body.body, 
    question.votes = req.body.votes
    res.send(question);
})
// deletes or removes any specified user
.delete( (req, res) => {
    const question = meetups.find(ele => ele.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).send('Nothing to delete');
        return;
    };
    const index = questions.indexOf(question);
    meetups.splice(index, 1);
    res.send(question);
});
// PATCH the Questions with an upvote or downvote
routesQuestions.route('/questioner.com/api/v1/questions/:id/:status')
.get((req, res) => {
    const vote = votes.find(ele => ele.status === parseInt(req.params.status));
    if (!vote) res.status(404).send('No vote made');
    res.send(vote);
    // console.log(votes)  
})
// inserts a new question into the system,
.patch( (req, res) => {
    const vote = votes.find(ele => ele.status === parseInt(req.params.status));
    if (!vote) {
        res.status(404).send('No vote made');
        return;
    };
    const {error} = validateVotes(req.body);
    console.log(error)
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    };
    vote.status = req.body.status,
    vote.data = req.body.data,
    vote.title = req.body.title,
    vote.body = req.body.body,
    vote.votes = req.body.votes
    res.send(vote);
})
// using Joi to validate the question function
function validateQuestion(question) {
    const schema = {
        id: Joi.number().required(),
        createdOn: Joi.date().required(),
        createdBy: Joi.number().min(2).required(),
        meetup: Joi.number().min(2).valid('').optional(),
        title: Joi.string().min(2).required(),
        body: Joi.string().min(2).required(),
        votes: Joi.number().min(2).required()
    };
    return Joi.validate(question, schema);
};
// using Joi to validate  votes patch
function validateVotes(vote) {
    const schema = {
        status: Joi.number().required(),
        data: Joi.array().ordered(Joi.object(
            {
                meetup: Joi.number().required(),
                title: Joi.string().required(),
                body: Joi.string().required(),
                votes: Joi.number().required(),
             })),
    };
    return Joi.validate(vote, schema);
};
/* End of Meet up End points 
-----------------------------------------------------------------------------*/

module.exports = routesQuestions;