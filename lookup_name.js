'use strict';

const arg = process.argv[2];
const pg = require("knex")({client: 'pg'});
const settings = require("./settings");
const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});


client.connect(handleConnection);
findPeopleByName(arg);

function handleConnection(err) {
  if (err) {
    errorHandler('Error occurred', err);
  } else {
  console.log('Searching ...');
  }
};

function errorHandler(message, err) {
  return console.error(message, err);
};

function printResults (results, userInput) {
  console.log(`Found ${results.rows.length} person(s) by the name ${userInput}`);
  results.rows.forEach(function (rows, i) {
    console.log(`${i+1}) ${rows.first_name} ${rows.last_name} born on ${rows.birthdate}`);
  });
  client.end();
};

function findPeopleByName(userInput) {
  client.query('SELECT first_name, last_name, birthdate FROM famous_people WHERE first_name = $1::text OR last_name = $1::text', [userInput], (err, results) => {
    if (err) {
      errorHandler('Query Error', err);
    } else {
      printResults(results, userInput);
    }
  });
};





