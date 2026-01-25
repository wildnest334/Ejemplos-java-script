// Clase para representar una tarea
class Tarea {
    constructor(nombre) {
        this.nombre = nombre;      // Nombre de la tarea
        this.completa = false;     // Estado: completa o incompleta
    }

    // Cambiar estado de la tarea
    completar() {
        this.completa = !this.completa;
    }

    // Editar nombre de la tarea
    editar(nuevoNombre) {
        if (nuevoNombre.trim() !== "") {
            this.nombre = nuevoNombre.trim();
        }
    }

   
    mostrar() {
        return `
            <li>
                <span style="text-decoration: ${this.completa ? "line-through" : "none"}">
                    ${this.nombre}
                </span>
                <button class="completar">✔</button>
                <button class="editar">Editar</button>
                <button class="eliminar">Eliminar</button>
            </li>
        `;
    }
}


class GestorDeTareas {
    constructor() {
        this.tareas = []; // Lista de tareas
        this.cargar();   
    }

    agregarTarea(nombre) {
        const tarea = new Tarea(nombre);
        this.tareas.push(tarea);
        this.guardar();
        this.render();
    }

    eliminarTarea(index) {
        this.tareas.splice(index, 1);
        this.guardar();
        this.render();
    }

    completarTarea(index) {
        this.tareas[index].completar();
        this.guardar();
        this.render();
    }

    editarTarea(index, nuevoNombre) {
        this.tareas[index].editar(nuevoNombre);
        this.guardar();
        this.render();
    }

    render() {
        const listaTareas = document.getElementById("lista-tareas");
        listaTareas.innerHTML = "";
        this.tareas.forEach(tarea => {
            listaTareas.innerHTML += tarea.mostrar();
        });
    }

    guardar() {
        localStorage.setItem("tareas", JSON.stringify(this.tareas));
    }

    
    cargar() {
        const datos = JSON.parse(localStorage.getItem("tareas")) || [];
        // Reconstruir objetos Tarea (no solo objetos planos)
        this.tareas = datos.map(d => {
            const tarea = new Tarea(d.nombre);
            tarea.completa = d.completa;
            return tarea;
        });
        this.render();
    }

    render() {
    const listaTareas = document.getElementById("lista-tareas");
    listaTareas.innerHTML = "";
    this.tareas.forEach(tarea => {
        listaTareas.innerHTML += `
            <li class="${tarea.completa ? "completa" : ""}">
                <span>${tarea.nombre}</span>
                <button class="completar">✔</button>
                <button class="editar">Editar</button>
                <button class="eliminar">Eliminar</button>
            </li>
        `;
    });
    }

}
const gestor = new GestorDeTareas();


const inputTarea = document.getElementById("nueva-tarea");
const btnAgregar = document.getElementById("agregar-tarea");
const listaTareas = document.getElementById("lista-tareas");


btnAgregar.addEventListener("click", () => {
    const texto = inputTarea.value.trim();
    if (texto) {
        gestor.agregarTarea(texto);
        inputTarea.value = "";
    } else {
        alert("Escribe una tarea");
    }
});


listaTareas.addEventListener("click", (e) => {
    const li = e.target.parentElement;
    const index = Array.from(listaTareas.children).indexOf(li);

    if (e.target.classList.contains("completar")) {
        gestor.completarTarea(index);
    }

    if (e.target.classList.contains("editar")) {
        const nuevoTexto = prompt("Edita la tarea:", gestor.tareas[index].nombre);
        if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
            gestor.editarTarea(index, nuevoTexto);
        }
    }

    if (e.target.classList.contains("eliminar")) {
        gestor.eliminarTarea(index);
    }
});
