//<-----------IMPORTACION DE VARIABLES DE ENTORNO-------------->
require('dotenv').config();

//-----------------------------------------------

//<-----------IMPORTACIONES--------------------->
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');


//-----------------------------------------------

//<---DECLARACION DE VARIABLES DE ENTORNO--->

require('dotenv').config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_HOSTNUMBER = process.env.DB_HOSTNUMBER

//------------------------------------------------

//<---------------------RUTA DE CONEXION SEQUELIZE------------------------->

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_HOSTNUMBER}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

//------------------------------------------------


const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

  //<----------------------------------------------------------->


// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

//<------------------------------------------------------------->

// En sequelize.models están todos los modelos importados como propiedades

// Para relacionarlos hacemos un destructuring

const { Videogame, Genre } = sequelize.models;

 //<---------------------RELACIONES------------------------->

 Videogame.belongsToMany(Genre, { through: 'videogameGenre' });
 Genre.belongsToMany(Videogame, { through: 'videogameGenre' });

//<---------------------------------------------------------------->

 //<---------------------EXPORTACIONES------------------------->

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};

//<---------------------------------------------------------------->