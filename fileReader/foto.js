let inFoto = document.querySelector('#inFoto');
let outFoto = document.querySelector('#outFoto');

inFoto.addEventListener('change', () => {
    let foto = inFoto.files[0],
        reader = new FileReader();
    if(!foto.type.startsWith('image/')){
        outFoto.src = '';
        return ;
    };

    reader.addEventListener('load', () => {
        outFoto.src = reader.result;
    });

    reader.readAsDataURL(foto);
});