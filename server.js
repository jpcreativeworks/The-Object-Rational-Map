const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}!`);
// });
//syncs your data base and structures your schemas
sequelize.sync({ force: false }).then(() => {
  //here doing an app listen, doing what it did before but we are syncing our data bases and then listening for aour express app
  app.listen(PORT, () => console.log('Now listening'));
});
