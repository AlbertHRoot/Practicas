let imagenesMiniatura=document.querySelectorAll('.miniatura');

for(let imagen of imagenesMiniatura){
    imagen.addEventListener("mouseover", (event) => {
        let src=imagen.getAttribute('src');
        let nuevaVista=document.createElement('img');
        nuevaVista.src=src;
        nuevaVista.id='maxiatura';
        imagen.parentElement.appendChild(nuevaVista);
    });
    imagen.addEventListener("mouseout", (event) => {
        let vista=document.getElementById('maxiatura');
        vista.remove();
    });
}

let obras = document.querySelectorAll('tbody tr');

const botonFiltro = document.getElementById('filtrar-generos');
botonFiltro.addEventListener("click", (event) => {
    let filtro=document.getElementById('filter');
    if(filtro.value==='0'){
        event.preventDefault();
    }else if(filtro.value==='1'){
        event.preventDefault();
        for(let obra of obras){
            let elementosObra=obra.childNodes;
            if(elementosObra[11].textContent!=='Barroco'){
                obra.classList.add('oculto');
            }else{
                obra.classList.remove('oculto');
            }
        }
    }else if(filtro.value==='2'){
        event.preventDefault();
        for(let obra of obras){
            let elementosObra=obra.childNodes;
            if(elementosObra[11].textContent!=='Manierismo'){
                obra.classList.add('oculto');
            }else{
                obra.classList.remove('oculto');
            }
        }
    }else if(filtro.value==='3'){
        event.preventDefault();
        for(let obra of obras){
            let elementosObra=obra.childNodes;
            if(elementosObra[11].textContent!=='Neo-Clasicismo'){
                obra.classList.add('oculto');
            }else{
                obra.classList.remove('oculto');
            }
        }
    }else if(filtro.value==='4'){
        event.preventDefault();
        for(let obra of obras){
            let elementosObra=obra.childNodes;
            if(elementosObra[11].textContent!=='Realismo'){
                obra.classList.add('oculto');
            }else{
                obra.classList.remove('oculto');
            }
        }
    }else if(filtro.value==='5'){
        event.preventDefault();
        for(let obra of obras){
            let elementosObra=obra.childNodes;
            if(elementosObra[11].textContent!=='Romanticismo'){
                obra.classList.add('oculto');
            }else{
                obra.classList.remove('oculto');
            }
        }
    }
    
});

function llenarPopup(src,titulo,artista,anio,genero){
    document.getElementById('edit-img').src=src;
    document.getElementById('edit-title').value=titulo;
    document.getElementById('edit-artist').value=artista;
    document.getElementById('edit-year').value=anio;
    document.getElementById('edit-gener').value=genero;
}
for(let obra of obras){
    obra.childNodes[13].addEventListener("click", (event)=>{
        vistaPopup=document.getElementById('popup-vist');
        vistaPopup.classList.remove('oculto');
        let ruta=obra.childNodes[3].childNodes[0].src;
        let titulo=obra.childNodes[5].textContent;
        let artista=obra.childNodes[7].textContent;
        let anio=obra.childNodes[9].textContent;
        let genero;
        if(obra.childNodes[11].textContent==='Barroco'){
            genero='1';
        }else if(obra.childNodes[11].textContent==='Manierismo'){
            genero='2';
        }else if(obra.childNodes[11].textContent==='Neo-Clasicismo'){
            genero='3';
        }else if(obra.childNodes[11].textContent==='Realismo'){
            genero='4';
        }else if(obra.childNodes[11].textContent==='Romanticismo'){
            genero='5';
        }
        llenarPopup(ruta,titulo,artista,anio,genero);
    });
}

let popupClose = document.getElementById('popup-close');
popupClose.addEventListener("click",(event)=>{
    vistaPopup=document.getElementById('popup-vist');
    vistaPopup.classList.add('oculto');
});
