//<---------IMPORTACIONES---------------->

const axios = require('axios');
const { Genre } = require('../db');
require('dotenv').config();
const { API_KEY } = process.env;

//------------------------------------->

//<-------TRAER GENRES DESDE LA API---->

const getGenres = async () => {
	try {
		const genres = await Genre.findAll();
		if (!genres.length) {
			const genresInformation = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
			await Genre.bulkCreate(genresInformation.data.results);
		}
	} catch (error) {
		console.log({ error: error.message });
	}
};

//------------------------------------->


//<------------EXPORTACIONES----------->

module.exports = getGenres;

//------------------------------------->