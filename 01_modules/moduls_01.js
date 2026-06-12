const validator = require("validator");
const superhero = require("superhero-name-library");
const email_chk = validator.isEmail("jack@sparow.com");
console.log(email_chk);

const randomsuperHero = superhero.random();
const allHeros = superhero.allNames();
console.log(allHeros);