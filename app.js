// Clase Tarea
class Tarea {
    constructor(texto) {
        this.texto = texto;
    }

    mostrar() {
        return `
            <li>
                <span>${this.texto}</span>
                <button class="editar">Editar</button>
                <button class="eliminar">Eliminar</button>
            </li>
        `;
    }
}

// Selección de elementos del DOM
const inputTarea = document.getElementById("nueva-tarea");
const btnAgregar = document.getElementById("agregar-tarea");
const listaTareas = document.getElementById("lista-tareas");

// Evento para agregar tarea
btnAgregar.addEventListener("click", () => {
    const texto = inputTarea.value;

    if (texto === "") {
        alert("Escribe una tarea");
        return;
    }

    const tarea = new Tarea(texto);
    listaTareas.innerHTML += tarea.mostrar();
    inputTarea.value = "";
});

// Evento para editar o eliminar (delegación de eventos)
listaTareas.addEventListener("click", (e) => {

    // Eliminar tarea
    if (e.target.classList.contains("eliminar")) {
        e.target.parentElement.remove();
    }

    // Editar tarea
    if (e.target.classList.contains("editar")) {
        const li = e.target.parentElement;
        const span = li.querySelector("span");
        const nuevoTexto = prompt("Edita la tarea:", span.textContent);

        if (nuevoTexto !== null && nuevoTexto !== "") {
            span.textContent = nuevoTexto;
        }
    }
});
