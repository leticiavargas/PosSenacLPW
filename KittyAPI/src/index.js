const catImage = document.querySelector('.catImage');

let response ='';
const url = 'https://api.thecatapi.com/v1/images/search';

window.addEventListener("load", () => {
   
    console.log("loading");
    
    getAllKitten().then(data => {
        
        //console.log(data);
        addImage(data);
    });
    
});

async function getAllKitten(){
    let response = await fetch(url, {
                            method: "GET",
                            headers: {
                                'Content-Type': 'application/json',
                                'x-api-key': '4ec19e3f-7b2e-44fb-a0ac-e44b9b9ee9da'
                            }        
                        });
    let data = await response.json();
    return data;
}

const addImage = (catInfo) => {
    console.log(catInfo);
    const imgCat = document.createElement('img');
    imgCat.src = catInfo[0].url;
    catImage.appendChild(imgCat);

}