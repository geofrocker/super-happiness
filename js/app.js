const express = require('express');
const app = express();





/* start questions end points 
Required is name and continent*/
const meetups = [{
    name: "question01",
    id: "1"
}];

//Root of Endpoint for all users
app.get('/', (req, res)=> {
    res.send('You have not made any request')
});

// shows all meetups available
app.get('/meetups', (req, res) => {
    res.send(meetups);
});


//   // port liatening at port 3000 asigned manually
app.listen(3000, (console.log("listening at port 3000!")));