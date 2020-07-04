const imgVeiculo = document.querySelector('#imgCarro');
const radioButton = document.querySelectorAll('.radioButton');
const checkButton = document.querySelectorAll('.checkButton');
const outPreco = document.querySelector('#outPreco');
const prices = [
    {"id": "rbKa", "price": 45900},
    {"id": "rbFiesta", "price": 50000},
    {"id": "rbFocus", "price": 55000},
    {"id": "ckPintura", "price": 5000},
    {"id": "ckAlarme", "price": 1000}
];

radioButton.forEach((elem) => {
    elem.addEventListener("change", function(event) {
        var item = event.target.id;            
        changeImage(item);
        carPrice(item);
        checkButton.forEach((e) => e.checked=false);
    });
});

checkButton.forEach((elem) => {
    elem.addEventListener("change", function(event) {
        var item = event.target.id; 
        if (elem.checked){
            calcPrice(item, "sum");   
        } else {
            calcPrice(item, "subtract");
        }       
         
    });
});

const changeImage = (id) => {
    imgVeiculo.src=`img/${id}.png`;
}

const carPrice = (id) =>{
   let aux = searchPrice(id);
   changePrintedPrice(aux);
}

const priceCurrency = () => {
    let priceCurrency = parseFloat(outPreco.textContent.replace( /^\D+/g, ''))*1000;
    return priceCurrency;
}

const calcPrice = (id, operation) => {
    let optPrice = searchPrice(id);
    if(operation === "subtract") {optPrice = optPrice * (-1)}
    let total = priceCurrency() + optPrice;
    changePrintedPrice(total);
}

const searchPrice = (id) => {
    let searchPrice = 0;
    prices.forEach((price) => {
        if(price.id === id){
            searchPrice = price.price;
        }
    });
    return searchPrice;
}

const changePrintedPrice = (price) => {
    outPreco.innerHTML=`${price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
}