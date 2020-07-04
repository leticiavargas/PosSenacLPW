let baralho = [];
const tipos = ['copas', 'paus', 'espadas', 'ouros'];
const letras = ['A', 'J', 'Q', 'K'];

const btComprarCarta = document.querySelector('#btnComprarCarta'),
      btApostar      = document.querySelector('#btnApostar'),
      btNovo         = document.querySelector('#btnNovo'),
      alert          = document.querySelector('#alert');
const localPontos    = document.querySelectorAll('span'),
      cards          = document.querySelectorAll('.card-body');

let userPoints = 0,
    pcPoints   = 0;

btComprarCarta.addEventListener('click', () => {
    const carta = baralho.pop();
    const imgCarta = document.createElement('img');
    imgCarta.src = `cartas/${carta}.png`;
    cards[0].append(imgCarta);
    userPoints += pesoCarta(carta);
    localPontos[0].innerText = userPoints;

    if(userPoints > 21) {
        alert.classList.add('alert-danger');
        alert.innerHTML = "<strong> Você perdeu!! </strong>";
        btApostar.disabled = true;
        btComprarCarta.disabled = true;
    }
});

const pesoCarta = carta => {
    let simbolo = carta.substr(0, carta.indexOf('_'));
    return letras.includes(simbolo) ? (simbolo == 'A' ? 11 : 10) : Number(simbolo);
};

btApostar.addEventListener('click', () => {
    do {
        const carta = baralho.pop();
        const imgCarta = document.createElement('img');
        imgCarta.src = `cartas/${carta}.png`;
        cards[1].append(imgCarta);
        pcPoints += pesoCarta(carta);
        localPontos[1].innerText = pcPoints;
    } while (pcPoints < userPoints);
    
    if(userPoints == pcPoints) {
        alert.classList.add('alert-info');
        alert.innerHTML = '<strong> Empate!</strong>';
    } else if (pcPoints > 21) {
        alert.classList.add('alert-success');
        alert.innerHTML = '<strong> Você Ganhou!</strong>';
    } else  {
        alert.classList.add('alert-danger');
        alert.innerHTML = '<strong> Você Perdeu!</strong>';
    }
    btApostar.disabled = true;
    btComprarCarta.disabled = true;
});

btNovo.addEventListener('click', () => {
    location.reload();
})

const montaBaralho = () => {
    for (let i = 2; i <= 10; i++){
        for(let tipo of tipos) {
            baralho.push(`${i}_${tipo}`);
        }
    }
    for (let letra of letras){
        for(let tipo of tipos) {
            baralho.push(`${letra}_${tipo}`);
        }
    }
    console.log({baralho});
    baralho = _.shuffle(baralho);
    console.log(baralho);
};

montaBaralho();