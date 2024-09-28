const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

app.listen(4000, 'localhost', function (err) {
  if (err) console.log(err);
  else console.log('listening on port 4000');
});
