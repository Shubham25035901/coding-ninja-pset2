const API_URL = `https://gateway.marvel.com/`
const publicKey = `235cddaae771601be17bdda296c53bcc`
const privateKey = `609c35fc8efe3de9fb9909c88ade44768a19b487`
const endpoint = `v1/public/characters`


import MD5 from "crypto-js/md5";

const ts = Date.now();

const hash = MD5(ts + privateKey + publicKey);


const inputBox = document.getElementById('hero-input')
const form = document.querySelector('form')
const resultContainer = document.getElementById('result')
resultContainer.style.padding = '0'
resultContainer.style.border = '0'

form.addEventListener('submit', e => {
    e.preventDefault()
    const superheroName = inputBox.value.toLowerCase()

    fetch(`${API_URL}${endpoint}?name=${superheroName}&ts=${ts}&apikey=${publicKey}&hash=${hash}`)
    .then(res => res.json())
    .then(data => display(data))
})

function display(res) {
    const {data} = res;
    const {results} = data;
    results.map(hero => {
       
        const HTML = `
            <div class="detail">
            <h2>${hero.name}</h2>
            <p>${hero.description ? hero.description : "No description"}</p>
            </div>
            <img src="${hero.thumbnail.path+'.'+hero.thumbnail.extension}" alt=${hero.name} />

        `
        resultContainer.innerHTML = HTML;
        resultContainer.style.padding = '.75em'
        resultContainer.style.border = '2px solid #fff'
    })
}

console.log(`${API_URL}${endpoint}?${ts}&apikey=${publicKey}&hash=${hash}`);


// axios.get(`${API_URL}${endpoint}?ts=${ts}&apiKey=${publicKey}&hash=${hash}`).then(data => console.log(data))