const express = require('express');
const cors = require('cors');
const { db } = require('./lib/database/config');
const app = express();
require('dotenv/config');

const routes = require('./lib/routes/router')(express.Router());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.listen(8080, 'localhost', () => {
  console.log('listening on port', 8080);
  db.sync({ force: false }).then(() => console.log(`connected to '${ process.env.DB_NAME }' database.`));
});