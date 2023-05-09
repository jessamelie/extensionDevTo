/*const axios = require('axios'); 
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
});*/


async function getArticle() {
    const requestString = 'https://dev.to/api/articles/latest';
    const dataArticles = await fetch(requestString);
    let responseArticles = await dataArticles.json();
	console.log(responseArticles);

	const cardContainer = document.getElementById('cards-container')

	for (let i = 0; i < 8; i++) {

		const card = document.createElement('div')
		card.className = "cards"
		cardContainer.appendChild(card)


		const picture = document.createElement('img')
		picture.className = "cover"
		picture.src = responseArticles[i].cover_image;
		if (picture.src == "http://127.0.0.1:5500/null" || picture.src == "chrome-extension://hocnkfcjihdnngadpjodnlfppgcjkfmf/null" ) {
			picture.src = "./images/techimg.jpg"
		}
		card.appendChild(picture)


		const cardbody = document.createElement('div')
		cardbody.className = "card-body"
		card.appendChild(cardbody)
		
		const title = document.createElement('h3')
		title.innerText = `📝${responseArticles[i].title}`
		cardbody.appendChild(title)

		const link = document.createElement('a')
		link.href = responseArticles[i].url;
		link.target = "_blank"
		link.innerText = "Lire l'article 🖱️"
		cardbody.appendChild(link)

		const date = document.createElement('p')
		date.innerText = responseArticles[i].readable_publish_date
		cardbody.appendChild(date)

		const readTime = document.createElement('p')
		readTime.innerText = `Temps de lecture : ${responseArticles[i].reading_time_minutes} min `
		cardbody.appendChild(readTime)

 }
}
  getArticle()
