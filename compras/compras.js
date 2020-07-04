
const adicionar = document.querySelector('.adicionar');
const compras = document.querySelector('.compras');
const pesquisar = document.querySelector('.pesquisar input');
const salvar = document.querySelector('.salvar');

const novoProduto = produto => {
    const html =`
    <li class="list-group-item d-flex justify-content-between align-items-center">
        ${produto}
        <i class="far fa-trash-alt delete"></i>
    </li>
    `;
    return html;
};

adicionar.addEventListener('submit', e => {
    e.preventDefault();
    const novo = adicionar.novo.value.trim();
    
    if(novo.length) {
        compras.innerHTML += novoProduto(novo);
        adicionar.reset();
    };
});

compras.addEventListener('click', e => {
    if (e.target.classList.contains('delete') || !!e.target.closest('.delete'))
    e.target.closest('.list-group-item').remove();
});

const filterCompras = palavra =>{
    Array.from(compras.children).filter((compra) => !compra.innerText.toLowerCase().includes(palavra))
        .forEach((compra) => compra.classList.add('filtered'));
    
    Array.from(compras.children).filter((compra) => compra.innerText.toLowerCase().includes(palavra))
        .forEach((compra) => compra.classList.remove('filtered'));
}

pesquisar.addEventListener('keyup', () => {
    const palavra = pesquisar.value.toLowerCase();
    filterCompras(palavra);
});

salvar.addEventListener('click', e => {
   let salvo = [];
    Array.from(compras.children).forEach((compra) => {
        salvo.push(compra.innerText);
    });

    localStorage.setItem("Compras", JSON.stringify(salvo));
   
});

const load = () => {
    if(localStorage.getItem('Compras')){
        listaSalva = JSON.parse(localStorage.getItem('Compras'));
        listaSalva.forEach((item)=> compras.innerHTML += novoProduto(item) );
       console.log(listaSalva);
    }
   
};

load();