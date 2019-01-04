
const app = require('./js/app');

// port listening to port automatically
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening at port ${port}....`));