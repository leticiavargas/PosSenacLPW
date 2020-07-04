const selHorario = document.querySelector('#selHorario'),
      inPreco = document.querySelector('#inPreco')
      selOp = document.querySelector('#selOp');

let precos = [];
let opcionais = [];

window.addEventListener('load', () =>{
    const url = 'https://quadrapos.herokuapp.com/quadra.php';
    const url2 = 'https://quadrapos.herokuapp.com/opcionais.php'
    fetch(url)
        .then(response => response.json())
        .then(data => {
            for(let d of data) {
                let option = document.createElement('option');
                option.value = d.id;
                option.text = d.horario;
                selHorario.appendChild(option);

                precos.push({id: d.id, horario: d.horario, preco: d.preco});
            }
        });

        fetch(url2)
        .then(response => response.json())
        .then(data => {
            for(let d of data) {
                let option = document.createElement('option');
                option.value = d.id;
                option.text = d.nome;
                selOp.appendChild(option);

                opcionais.push({id: d.id, nome: d.nome, preco: d.preco});
            }
        });
});

const obterValor = () => {
    let preco;
    if(selHorario.value == '') {
        preco = 0;
    } else {
        for (let p of precos){
            if(selHorario.value == p.id) {
                preco = p.preco;
                break;
            }
        }
    }
    return Number(preco);
};


selHorario.addEventListener('change', () => {
    inPreco.value = (obterValor() + verOpt()).toLocaleString('pt-br', {minimumFractionDigits: 2});
});

const verOpt = () =>{
    let total = 0

    for(let i = 0 ; i < selOp.length; i ++){
        if(selOp[i].selected){
            total += Number(opcionais[i].preco);
        }
    }
    return total;
}

selOp.addEventListener('change', () => {
    inPreco.value = (obterValor() + verOpt()).toLocaleString('pt-br', {minimumFractionDigits: 2});
});