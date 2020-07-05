const novaApostaHtml = (aposta) => {
    const li = document.createElement('li');

    li.innerHTML = `${aposta.inNome} - ${aposta.inPeso}gr`;
    li.style.fontStyle = 'italic';
    li.classList.add('list-group-item');
    li.setAttribute('data-id', aposta.id);
    return li;
};

export default novaApostaHtml;