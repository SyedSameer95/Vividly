const express = require('express');
const app = express();
const genres = require('./routes/genres');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly')
.then(console.log('Connected to MongoDB...'))
.catch(err => console.log('Error', err));

// // const Logger = require('./Logger');
// const helmet = require('helmet');
// const morgan = require('morgan');
// const config = require('config'); 

// console.log(`Environment: ${process.env.NODE_ENV}`);
// console.log(`Application Name: ${config.get('name')}`);
// console.log(`Mail Server: ${config.get('mail.host')}`);
// console.log(`Mail Password: ${config.get('mail.password')}`);

// app.use(Logger);
// app.use(helmet());

// if(app.get('env') === 'development'){
//     app.use(morgan('tiny'));
//     console.log('morgan enabled.')
// }

app.use(express.json());
app.use('/api/genres/', genres)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));