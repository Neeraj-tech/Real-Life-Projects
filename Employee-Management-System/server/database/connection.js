const mongoose = require('mongoose');

mongoose
  .connect(process.env.DATABASE_URL)
  .then(dbres => console.log('db connected'))
  .catch(err => console.log(err));
