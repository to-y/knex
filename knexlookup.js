'use strict';

const arg = process.argv[2];
const settings = require("./settings");
const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});


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
  results.forEach(function (person) {
    console.log(`Found ${results.length} person(s) by the name ${userInput}`);
    console.log(`${person.id}) ${person.first_name} ${person.last_name} born on ${person.birthdate}`);
  })
knex.destroy();
};

function findPeopleByName(userInput) {
  knex.select('*').from('famous_people')
    .where('first_name', '=', userInput)
    .orWhere('last_name', '=', userInput)
    .asCallback(function (err, results) {
      if (err) {
        errorHandler('Query Error', err);
      } else {
        printResults(results, userInput);
      }
    });
};





