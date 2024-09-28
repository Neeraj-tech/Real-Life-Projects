const { promisify } = require('util');
const User = require('./../database/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.home = async (req, res) => {
  res.send(`<h2> API for Employee Management System</h2>
    <h3> Goto port 3000 for client app</h3>
    `);
};

exports.signin = async (req, res) => {
  //console.log(req.body.email);
  User.findOne({ email: req.body.email })
    .then(dbres => {
      if (dbres) {
        if (bcrypt.compareSync(req.body.password, dbres.password)) {
          const token = jwt.sign({ id: dbres._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION,
          });
          res.status(200).send({
            message: 'signin successful',
            access_token: token,
            expires_in: process.env.JWT_COOKIE_EXPIRES_IN,
          });
        } else {
          res.status(404).send({ message: 'incorrect credentials' });
        }
      } else res.status(404).send({ message: 'incorrect credentials' });
    })
    .catch(err => {
      console.log('error: ' + err.message);
      res.status(404).send({ message: 'incorrect credentials' });
    });
};

exports.signup = async (req, res) => {
  //console.log(req.body);

  const hashPass = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(5));

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPass,
  });

  user
    .save()
    .then(dbres => {
      res.status(201).send({ message: `${dbres.name} has been added to db` });
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

exports.signout = async (req, res) => {
  console.log('signout controller: On clientside');
};

exports.protect = catchAsync(async (req, res, next) => {
  //steps 1) getting token and check if exits
  //console.log('protect controller:');
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    console.log('protect controller: no token provided');
    return next(new AppError('Token is required', 401));
  }
  //step 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //step 3) check if user exits
  const freshUser = await User.findById(decoded.id);

  if (!freshUser) {
    return next(new AppError('user not found', 401));
  }

  //freshUser && console.log(`hello ${freshUser.name}`);
  //step 4) check if user changed the password after the token was issued
  next();
});
