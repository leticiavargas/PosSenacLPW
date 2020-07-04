const outFrutas = document.querySelector('#outFrutas');
const divJogo = document.querySelector('#divJogo');
const divFrutas = document.querySelector('#divFrutas');
const btVerificar = document.querySelector('#btVerificar');
const btNovamente = document.querySelector('#btNovamente');
const mensaOk = document.querySelector('#mensaOk');
const mensaErro = document.querySelector('#mensaErro');


let fruits = [
                {"id": "imgBanana", "name": "banana", "image": "banana.jpg", "quant": 1},
                {"id": "imgMorango", "name": "morango", "image": "morango.jpg","quant": 2},
                {"id": "imgLaranja", "name": "laranja", "image": "laranja.jpg","quant": 3},
                {"id": "imgMaca", "name": "maçã", "image": "maca.jpg","quant": 4},
                {"id": "imgUva", "name": "uva", "image": "uva.jpg","quant": 5}              
            ];
let fruitsResult = [
                {"id": "imgBanana", "sum": 0},
                {"id": "imgMorango", "sum": 0},
                {"id": "imgLaranja", "sum": 0},
                {"id": "imgMaca", "sum": 0},
                {"id": "imgUva", "sum": 0}        
            ];

addFruit = (fruitToAdd) => {
    const fruit = fruits.find(element => element.id == fruitToAdd);
    const fruitAdd = document.createElement('img');
    fruitAdd.id = fruit.id;
    fruitAdd.src = `assets/${fruit.image}`;
    return fruitAdd;
};

divFrutas.addEventListener('click', e => {
    divJogo.appendChild(addFruit(e.path[0].id));
});

divJogo.addEventListener('click', (e) => {
    e.target.remove();
});

btNovamente.addEventListener('click', () => {
    document.location.reload(true);
});

btVerificar.addEventListener('click', () => {
    const fruitArray = Array.from(divJogo.children);
    const mixFruitResult = mixFruit(fruitArray);
    if (mixFruitResult){
        let result = countFruitResult();
        if(result) {
            mensaOk.classList.remove('d-none');
       } else {
            mensaErro.classList.remove('d-none');
       }
        
    } else {
        mensaErro.classList.remove('d-none');
    }
    btNovamente.classList.remove('d-none');
    btVerificar.classList.add('d-none');
});

const countFruitResult = () => {
    return fruitsResult.every(({id, sum}) => (sum == fruits.find(f => f.id == id).quant));
};

const sumFruit = (fruit) =>{
    fruitsResult.forEach((fruitR) => { if(fruitR.id === fruit) {fruitR.sum +=1 } });
};

const mixFruit = (fruitArray) =>{
    let fruitBefore ='';
    for (f of fruitArray){
        if(fruitBefore === f.id){
            return false;
        }
        fruitBefore = f.id;
        sumFruit(f.id);
    }
    return true
};


const getRandom = () => {
    return Math.floor(Math.random() * 3) + 1;
};

const randomFruits = () => {
    
    fruits.forEach((fruit) => {
        fruit.quant = getRandom()
        outFrutas.innerText += ` ${fruit.quant} ${fruit.name} ::`;
    });
};


randomFruits();