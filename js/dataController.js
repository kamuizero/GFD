/**
 * Created by Aurelio on 2017/01/25.
 *
 * Clase para manejar lectura y escritura de datos en LOD
 *
 */

$(document).ready(function () {

});

$.getScript("js/sparqlEPCUDAO.js", function() {
    alert("Cargado el objeto de acceso a Datos de SPARQLEPCU.");
});

function leerData() {
    sparqlRead();
    return true;
}

function evaluarClinica(voto) {

    //Sumamos a los valores existentes
    var resultado = false;

    leerData();

    alert('el voto es para la clinica con ID numero ' + voto.id);

    return resultado;
}

function registrarClinica(clinica){
    var resultado = false;
    return resultado;
}