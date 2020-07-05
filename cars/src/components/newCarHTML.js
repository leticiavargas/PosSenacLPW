const newCarHTML = ({id, modelo, marca, ano, preco, destaque}) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${modelo}</td>
        <td>${marca}</td>
        <td>${ano}</td>
        <td>${preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
        <td class="text-left">
            <i class="fas text-danger fa-times delete"></i>
            <i class="${destaque ? 'fas' : 'far'} fa-heart text-warning destak"></i>
        </td>
    `

    tr.setAttribute('data-id', id);
    if (destaque)
        tr.classList.add('stared');
    return tr;
}

export default newCarHTML;