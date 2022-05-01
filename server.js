const app = require('./app');
const env = require('dotenv').config({ path: './config.env' });

const PORT = +env.PORT || 8000;
app.listen(PORT, env.URL);
