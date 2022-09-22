const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
console.log(app.get('env'));
console.log(process.env);
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`You are currently listening to the port ${port}`);
});
