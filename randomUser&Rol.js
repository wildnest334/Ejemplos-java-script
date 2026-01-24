class Usuario{
    //constructor
    constructor(nombre, email, foto){
        this.nombre = nombre;
        this.email = email;
        this.foto = foto;
    }
    
    
    mostrar(){
        return `
        <div class = "card">
            <img src = "${this.foto}" alt = "${this.nombre}">
            <h3>${this.nombre}</h3>
            <p>${this.email}</p>      
        </div>
        `;
    }
}

class UsuarioControlador extends Usuario {
    constructor(nombre, email, foto, rol) {
        super(nombre, email, foto);
        this.rol = rol;
    }

    mostrar() {
        return `
        <div class = "card">
            <img src = "${this.foto}" alt = "${this.nombre}">
            <h3>${this.nombre}</h3>
            <4>p>${this.rol}</p>
            <p>${this.email}</p>      
        </div>
        `;
    }
    }

//funcion flecha para renderizar
const renderUsuarios = (usuarios) => {
    const contenedor = document.getElementById("Usuarios");
    contenedor.innerHTML = usuarios.map(u => u.mostrar()).join("");
}

const obtenerUsuarios = async (cantidad = 10) => {
    try {
        const respuesta = await fetch(`https://randomuser.me/api/?results=${cantidad}`);
        const datos = await respuesta.json();
        const roles = ["Admin, Editor, Viewer"];
        let listaUsuarios = [];

        datos.results.forEach((u, i) => {
            //Usuario normal
            if (i % 2 == 0){
                listaUsuarios.push(new Usuario(u.name.first, u.email, u.picture.medium, u.roles))
            }
            else {
                listaUsuarios.push(new UsuarioControlador(
                    u.name.first + '' + u.name.last,
                u.email,
                u.picture.medium,
                roles[i% roles.length]
            ))
            }
        });
        renderUsuarios(listaUsuarios);
    } catch (error) {
        console.error("Ocurrio un error al obtener los usuarios", error);
    }
}


const boton = document.getElementById("btnCargar");
boton.addEventListener("click", () => obtenerUsuarios(3))