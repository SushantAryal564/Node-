const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
console.log(process.env.port);
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log('You are currently listening to port 3000');
});
