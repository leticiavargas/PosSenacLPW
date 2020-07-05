import './style.css';
import {Aposta, ApostaLista} from './classes';
import novaApostaHtml from './components/novaApostaHtml';

const inNome = document.querySelector('#inNome');
const inPeso = document.querySelector('#inPeso');
const outApostas = document.querySelector('#outApostas');
const btCancelar = document.querySelector('#btCancelar');
const btLimpar = document.querySelector('#btLimpar');
const btVencedor = document.querySelector('#btVencedor');

let listaAposta = new ApostaLista();

document.querySelector('#btApostar').addEventListener('click', () => {
    const aposta = new Aposta(inNome.value, inPeso.value);
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
    
    if(dados.filter(x => !x.ativo).length == 0){
        alert('Selecione a aposta a ser cancelada ¯\\_(ツ)_/¯');
        return;
    } else {
        Array.from(outApostas.children)
             .forEach(li => {
                if(li.classList.contains('inativo'))
                    li.remove();
            });
            listaAposta.removeInativos();
    }
});

btLimpar.addEventListener('click', () => { 
    if(!confirm('Confirma a exclusão de todas as apostas?')) {
        return;
    }
    while(outApostas.firstChild){
        outApostas.removeChild(outApostas.firstChild);
    }
});

btVencedor.addEventListener('click', (event) => {
    if (listaAposta.get().length > 1) {
      const peso = prompt('Informe o peso(em gramas) da melancia... ');
      alert("Verificando ganhador .... ");
      const listaVencedor = listaAposta.ordenaVencedores(peso);
      const vencedor = listaVencedor[0];
      alert(`E o vencedor é... ${vencedor.inNome}`);
    } else {
      alert('Ainda não temos apostas suficientes...');
    }
  });