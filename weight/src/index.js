import './style.css';
import {Aposta, ApostaLista} from './classes';
import novaApostaHtml from './components/novaApostaHtml';

const inNome = document.querySelector('#inNome');
const inPeso = document.querySelector('#inPeso');
const outApostas = document.querySelector('#outApostas');
const btCancelar = document.querySelector('#btCancelar');
const btLimpar = document.querySelector('#btLimpar');

let listaAposta = new ApostaLista();

document.querySelector('#btApostar').addEventListener('click', () => {
    const aposta = new Aposta(inNome.value, inPeso.value);
    console.log(aposta);

    outApostas.appendChild(novaApostaHtml(aposta));

    listaAposta.novaAposta(aposta);

    inNome.value = '';
    inPeso.value = '';
    inNome.focus();
});

outApostas.addEventListener('click', (event) => {
    const id = event.target.getAttribute('data-id');

    listaAposta.ativarDesativar(id);
    event.target.classList.contains('inativo') ? event.target.classList.remove('inativo') : event.target.classList.add('inativo');
});

btCancelar.addEventListener('click', () => {
    const dados = listaAposta.get();
    console.log(dados);
    if(dados.filter(x => !x.ativo).length == 0){
       console.log('dentro do if');
        alert('Selecione a aposta a ser canceladas ¯\\_(ツ)_/¯');
        return;
    }
    dados.filter(x => x.ativo)
    let test = listaAposta.removerInativos;
    console.log(test);
});

btLimpar.addEventListener('click', () => { 
    if(!confirm('Confirma a exclusão de todas as apostas?')) {
        return;
    }
    while(outApostas.firstChild){
        outApostas.removeChild(outApostas.firstChild);
    }
});

