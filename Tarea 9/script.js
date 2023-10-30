/* se obtienenreferencias a los elementos del DOM que necesitarás manipular, 
como el campo de entrada de texto, el botón de agregar tarea y la lista de tareas. */
const entradaTarea = document.getElementById("tarea");
const botonTarea = document.getElementById("agregarTarea");
const listaTareas = document.getElementById("listaTareas");

/* Esta función debería tomar el texto del campo de entrada, 
crear un nuevo elemento de lista (<li>) y agregarlo a la lista de tareas*/
function agregarElemento(){
    const textoTarea = entradaTarea.value;

    if (textoTarea.trim() !== ""){
        const nuevaTarea = document.createElement("li");
        nuevaTarea.textContent = textoTarea;

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.className = "eliminar";
        botonEliminar.addEventListener("click", function() {
            listaTareas.removeChild(nuevaTarea);
        });

        nuevaTarea.appendChild(botonEliminar);
        nuevaTarea.addEventListener("click", function() {
            nuevaTarea.classList.toggle("completada");
        });

        listaTareas.appendChild(nuevaTarea);
        entradaTarea.value = ""; // Limpia el campo de entrada después de agregar la tarea.
    }
}
/*Se agrega un listener para el boton*/
botonTarea.addEventListener("click",agregarElemento);