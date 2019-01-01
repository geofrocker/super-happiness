const express = require('express');
const bodyParser = require('body-parser');
const app = express();


// call Joi for authotication
const Joi = require('joi');

// call express to json objects
app.use(express.json());





/* start questions end points 
Required is name and continent*/
const users = [{
    id: 1,
    firstname: 'Aaron',
    lastname: 'Sekisambu' ,
    othername: '' ,
    email: 'aaron.sekisambu@gmail.com' ,
    phoneNumber: 256,
    username: 'aaron.sekisambu' ,
    registered: new Date(),
    isAdmin: true
},
{
    id: 2,
    firstname: 'Aaron',
    lastname: 'Sekisambu' ,
    othername: '' ,
    email: 'aaron.sekisambu@gmail.com' ,
    phoneNumber: 256,
    username: 'aaron.sekisambu' ,
    registered: new Date(),
    isAdmin: true
},
{
    id: 3,
    firstname: 'Aaron',
    lastname: 'Sekisambu' ,
    othername: '' ,
    email: 'aaron.sekisambu@gmail.com' ,
    phoneNumber: 256,
    username: 'aaron.sekisambu' ,
    registered: new Date(),
    isAdmin: true
}



];
const meetups = [{
    id: 1,
    createdOn: new Date() ,
    location : 'Kampala' ,
    images: '[String, String]' , // OPTIONAL: URL to the image location
    topic: 'Express',
    happeningOn: new Date() , // when the meetup is holding
    Tags: '[String, String]'
}];
const questions = [{
    id: 1,
    createdOn: new Date() ,
    createdBy: 1 , // represents the user asking the question
    meetup: 1, // represents the meetup the question is for
    title : 'Express',
    body: 'Why so many libaries in Javascript',
    votes: 1
}];
const rsvps = [{
    id: 1,
    meetup: 1,
    user: 1, // represents the user
    response: 'yes', // [yes, no, or maybe]
}];

const votes = [{
    status: 1,
    data: [ {
        meetup: 1, // meetup record primary key
        title: 'Express', // title of the question
        body: 'Why so many libaries in Javascript', // body of the question
        votes: -1
    }]
}];


//Root of Endpoint for all users
app.get('/questioner.com', (req, res)=> {
    res.status(200).send({ message: 'You have not made any request'})
});

// shows all users available
app.get('/questioner.com/api/v1/users', (req, res) => {
    res.send(users);
});

// Gets a specific user using the user ID
app.get('/questioner.com/api/v1/users/:id', (req, res) => {
    const user = users.find(ele => ele.id === parseInt(req.params.id));
    if (!user) res.status(404).send('Username or password is incorect');
    res.send(user);
});





// inserts a user into the syste,
app.post('/questioner.com/api/v1/users', (req, res) => {
    const {error} = validateOrder(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    };
    const user = {
        id: users.length + 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        othername: req.body.othername,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        username: req.body.username,
        registered: req.body.registered,
        isAdmin: req.body.isAdmin
    }
    users.push(user);
    res.send(user);
});

// using Joi to validate in this function
function validateOrder(user) {
    const schema = {
        id: Joi.number().required(),
        firstname: Joi.string().min(2).required(),
        lastname: Joi.string().min(2).required(),
        othername: Joi.string().min(2).valid('').optional(),
        email: Joi.string().min(2).email().required(),
        phoneNumber: Joi.number().min(3).required(),
        username: Joi.string().min(2).required(),
        registered: Joi.date().required(),
        isAdmin: Joi.boolean().invalid(false).required()
    };
    return Joi.validate(user, schema);
};

// updates the the exisitng list of user
app.put('/questioner.com/api/v1/users/:id', (req, res) => {
    const user = users.find(ele => ele.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).send('invalid user');
        return;
    };
    const {error} = validateOrder(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    };
    user.id = req.body.id,
    user.firstname = req.body.firstname,
    user.lastname = req.body.lastname,
    user.othername = req.body.othername,
    user.email = req.body.email,
    user.phoneNumber = req.body.phoneNumber,
    user.username = req.body.username,
    user.registered = req.body.registered,
    user.isAdmin = req.body.isAdmin
    res.send(user);
});

// deletes or removes any specified user
app.delete('/questioner.com/api/v1/users/:id', (req, res) => {
    const user = users.find(ele => ele.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).send('Nothing to delete');
        return;
    };

    const index = users.indexOf(user);
    users.splice(index, 1);
    res.send(user);
});







// check on wrong input
app.all('*', (req, res) => {
    res.status(404).send({message: "Page not found"});
})





module.exports = app;