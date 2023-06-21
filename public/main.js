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

const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=5&api_key=live_hc0y7Q39dB3QzxIWVtJtUjqqiqtCSK0uN2SGEdFz6rVm71KdZHFj58SjZOnVHobN';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?api_key=live_hc0y7Q39dB3QzxIWVtJtUjqqiqtCSK0uN2SGEdFz6rVm71KdZHFj58SjZOnVHobN';
const API_URL_FAVORITES_DELETE = (id) =>`https://api.thecatapi.com/v1/favourites/${id}?api_key=live_hc0y7Q39dB3QzxIWVtJtUjqqiqtCSK0uN2SGEdFz6rVm71KdZHFj58SjZOnVHobN`;

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
    const btnFavorite1 = document.getElementById("btn1");
    const btnFavorite2 = document.getElementById("btn2");
    const btnFavorite3 = document.getElementById("btn3");
    const btnFavorite4 = document.getElementById("btn4");



    //const img5 = document.getElementById("img5");

    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
    img4.src = data[3].url;
    /*img5.src = data[4].url;*/

    btnFavorite1.onclick = () => saveFavoriteGatico(data[0].id)
    btnFavorite2.onclick = () => saveFavoriteGatico(data[1].id)
    btnFavorite3.onclick = () => saveFavoriteGatico(data[2].id)
    btnFavorite4.onclick = () => saveFavoriteGatico(data[3].id)
    //btnFavorite.onclick = () => saveFavoriteGatico(data[0].id);
    
}
}


async function loadFavoriteGaticos(){
    const res = await fetch(API_URL_FAVORITES);
    const data = await res.json();
    console.log("Favoritos");
    console.log(data);

    if(res.status !== 200) {
        spanError.innerHTML = "Hubo un error..." + res.status + data.message;
    } else{
        const sectionFavorites = document.querySelector('.section-favorites');
        sectionFavorites.innerHTML = "";
        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Gatos favoritos');
        h2.appendChild(h2Text);
        h2.classList.add("subtitle");
        const i = document.createElement('i');
        i.classList.add("fa-solid", "fa-star");
        h2.appendChild(i)
        sectionFavorites.appendChild(h2);
        const container = document.createElement('div');
        container.id = "favoriteImages";
        data.forEach(gatico =>{
            //const container = document.getElementById("favoriteImages");
            const div = document.createElement('div');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const i = document.createElement('i');
            img.classList.add('img');
            btn.classList.add("btn-remove");
            btn.onclick = () => deleteFavoriteGatico(gatico.id);
            i.classList.add("fa-solid", "fa-circle-minus");
            btn.appendChild(i);
            div.appendChild(btn);
            div.appendChild(img);
            container.classList.add('div-favImgs')
            container.appendChild(div);
            sectionFavorites.appendChild(container)
            img.src = gatico.image.url
            img.width = 340;
        })
    }
}

async function saveFavoriteGatico(id) {
    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: id
        }),
    });

    const data = await res.json();
    console.log("Save");
    console.log(res);

    if(res.status !== 200) {
        spanError.innerHTML = "Hubo un error... " + res.status + data.message;
    } else{
        console.log("Gato guardado en favoritos");
        loadFavoriteGaticos();
    } 

}

async function deleteFavoriteGatico (id) {
    const res = await fetch(API_URL_FAVORITES_DELETE(id),{
        method: 'DELETE',
    });
    const data = await res.json();

    if(res.status !== 200) {
        spanError.innerHTML = "Hubo un error... " + res.status + data.message;
    }  else{
        console.log("Gatico eliminado de favoritos");
        loadFavoriteGaticos();
    }
}

//const myButton = document.getElementById("generar");
//myButton.onclick = loadRandomGaticos();


loadRandomGaticos();
loadFavoriteGaticos();
