'use strict';

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

let first_name = process.argv[2];
let last_name = process.argv[3];
let birth_date = process.argv[4];

addPersonByName(first_name, last_name, birth_date);

function addPersonByName(firstName, lastName, birthDate) {

  knex('famous_people')
  .insert([{first_name: firstName, last_name: lastName, birthdate: birthDate}])
  .then(function(result) {
    console.log(result);
  })
knex.destroy();
};




