// comentario comentado
alert("Adios mundo cruel")
function suma() {
    let numero1 = parseInt(document.getElementById("numero1").value);
    let numero2 = parseInt(document.getElementById("numero2").value);
    let result = document.getElementById("resultado");
    let resultado = 0;
 

    resultado = (numero1 + numero2);
    

    result.innerHTML = resultado;

}
let botones = document.getElementById("btns");
botones.addEventListener("click", mostrar);