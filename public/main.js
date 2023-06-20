// console.log("hola");

// const Url= 'https://api.thecatapi.com/v1/images/search';

// function generateCat() {
// fetch(Url)
//   .then(res => res.json())
//     .then(data => {
//     const img = document.querySelector('img');
//     img.src = data[0].url;
//   });
// }

// const button = document.querySelector("button");

const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=4';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?limit=3&api_key=live_hc0y7Q39dB3QzxIWVtJtUjqqiqtCSK0uN2SGEdFz6rVm71KdZHFj58SjZOnVHobN';

const spanError = document.getElementById("error");

async function loadRandomGaticos() {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    console.log("Random");
    console.log(data);
    
    if(res.status != 200) {
        spanError.innerText = "Hubo un error... " + res.status + data.message;

    } else {
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const img3 = document.getElementById("img3");
    const img4 = document.getElementById("img4");
    const img5 = document.getElementById("img5");

    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
    img4.src = data[3].url;
    img5.src = data[4].url;


    }
}

async function loadFavoriteGaticos() {
    const res = await fetch(API_URL_FAVORITES);
    const data = await res.json();
    console.log("Favoritos");
    console.log(data);
    
    if(res.status != 200) {
        spanError.innerHTML = "Hubo un error... " + res.status + data.message;
    } 
}

const myButton = document.getElementById("generar");
myButton.onclick = loadRandomGaticos();


loadRandomGaticos();
loadFavoriteGaticos();
