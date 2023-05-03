const axios = require('axios'); 
const cheerio = require('cheerio'); 
const fs = require('fs'); 
 
const targetURL = 'https://dev.to/'; 
 
const getArticles = ($) => { 
	// Get all list items from the unodered list with a class name of 'products' 
	const articles = $('.crayons-story__body'); 
	const articlesData = []; 
	// The 'each()' method loops over all pokemon list items 
	articles.each((index, el) => { 
		// Get the image, name, and price of each pokemon and create an object 
		const article = {} 
 
		// Selector to get the image 'src' value of a pokemon 
		article.title = $(el).find('h2').text(); 
		article.link = $(el).find('a').text(); // Selector to get the name of a pokemon 
		article.duration = $(el).find('small').text(); // Selector to get the price of a pokemon 
        article.pubDate = $(el).find('time').text(); 
		articlesData.push(article) 
	}) 

    const getImage = ($) => {
        const images = $('.crayons-article__cover');
        const imagesData = []
        images.each((index, el) => {
            const picture ={}
            picture.img=$(el).find('img').attr('src');// Selector to get the price of a pokemon 
            imagesData.push(picture) 
        })
        return imagesData
    }
    getImage($);

	// Create a 'pokemon.json' file in the root directory with the scraped pokemonData 
	fs.writeFile("article.json", JSON.stringify({articlesData, imagesData}), (err) => { 
		if (err) { 
			console.error(err);
			return; 
		} 
		console.log("Data written to file successfully!"); 
	}); 
} 

// axios function to fetch HTML Markup from target URL 
axios.get(targetURL).then((response) => { 
	const body = response.data; 
	const $ = cheerio.load(body); // Load HTML data and initialize cheerio 
	getArticles($) 
});

