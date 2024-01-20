const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');

// const auth = require('./auth')



// const router = require('./routes/db');
// const loadRouter = require('./routes/load');

const app = express();
const cors = require('cors');
app.use(cors());
app.use(compression());
app.use(bodyParser.json({type: 'application/json'}));

//const PORT = process.env.WEB_SERVER_PORT || 9002;
//const ROOT = 'web';

// error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!')
// });

//app.use('/', express.static(ROOT));

app.get('/', (req, res) => {
    res.send('city finder')
  })


  app.get('/cities', (req, res) => {
    // const cityName = req.params.cityName;
    
    res.send(`indore , mumbai , dewas, jammu`);
  });
// app.use('/askdb', router);
// app.use('/load', loadRouter);


// //Auth - 

app.use(bodyParser.json());
const users = {
  "rohit@google.com": "ABC",
  "kohli@google.com": "ABC1",
  "gayle@google.com": "ABC2",
  "dhoni@google.com": "ABC3",
};

app.post('/authenticate', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    const error = new Error('Email and password are required.');
    error.status = 400;
    return next(error);
  }

  if (users.hasOwnProperty(email) && users[email] === password) {
    console.log('Authentication successful!');
    res.status(200).json({ success: true, message: 'Authentication successful!' });
  } else {
    const error = new Error('Authentication failed. Invalid email or password.');
    error.status = 401;
    next(error);
  }
});
app.post('/users', (req, res, next) => {
  console.log(req.body);
  res.send('users');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(9000, () => {
  console.log('SUCCESS: Server started at port: http://localhost:9000');
});


