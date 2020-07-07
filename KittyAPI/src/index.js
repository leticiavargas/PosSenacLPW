const catImage = document.querySelector('.catImage');
const favorite = document.querySelector('.favorite');

let catId = ''; 

let response ='';
const url = 'https://api.thecatapi.com/v1/images/search';
const url2 = 'https://api.thecatapi.com/v1/favourites';

window.addEventListener("load", () => {
   
    console.log("loading");
        getOneKitten().then(data => {
        addImage(data);
    });
    
});
favorite.addEventListener('click', ({target}) => {
    postFavourites(catId)
        .then(data => {
            console.log(data);
            if(data.message === 'SUCCESS'){
                target.classList.remove('far');
                target.classList.add('fas');
            }
        });   
});

async function postFavourites(idCat){
    
    let response = await fetch(url2, {
                            method:"POST",
                            headers:{
                                'Content-Type': 'application/json',
                                'x-api-key': '4ec19e3f-7b2e-44fb-a0ac-e44b9b9ee9da'
                            },
                            body: JSON.stringify({"image_id": idCat})
                        });
    let data = await response.json();
    return data;
}


async function getOneKitten(){
    let response = await fetch(url, {
                            method: "GET",
                            headers: {
                                'Content-Type': 'application/json',
                                'x-api-key': '4ec19e3f-7b2e-44fb-a0ac-e44b9b9ee9da'
                            }        
                        });
    let data = await response.json();
    catId = data[0].id;
    return data;
}

const addImage = (catInfo) => {
    console.log(catInfo);
    const imgCat = document.createElement('img');
    imgCat.src = catInfo[0].url;
    catImage.appendChild(imgCat);

}