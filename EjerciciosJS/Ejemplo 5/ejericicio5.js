//Agregamos el elemento target que referencia la imagen y quitamos un event
function abrirRegalo() {
    //const image = document.querySelector('img');
    const image = event.currentTarget;
    image.src = 'giphy.gif';
    image.removeEventListener('click', abrirRegalo);
}

const image = document.querySelector('img');
image.addEventListener('click', abrirRegalo);