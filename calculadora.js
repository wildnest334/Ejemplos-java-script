// comentario comentado
alert("Adios mundo cruel")
function mostrar(e) {
    let numero1 = parseInt(document.getElementById("numero1").value);
    let numero2 = parseInt(document.getElementById("numero2").value);
    let result = document.getElementById("resultado");
    let resultado = 0;
    let operacion = e.target.id;
 
    if (operacion == "suma"){
     resultado = numero1 + numero2;   
    }
    
    else if (operacion == "resta"){
        resultado = numero1 - numero2;
    }

    else if (operacion == "multiplica"){
        resultado = numero1 * numero2;
    }
    else if (operacion == "divide"){
        resultado = numero1 / numero2;
    }   

    else {operacion == "algoritmo"
        alert("Funcionalidad en progreeso");

    }

    result.innerHTML = resultado;

}
let botones = document.getElementById("btns");
botones.addEventListener("click", mostrar);