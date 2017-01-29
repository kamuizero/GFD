/**
 * Created by Aurelio on 2017/01/25.
 *
 * Clase para manejar lectura y escritura de datos en LOD
 *
 */

$(document).ready(function () {

});

$.getScript("js/sparqlEPCUDAO.js");

function leerData() {
    sparqlRead();
}

function terminoCreacionObjeto(clinicas) {
    alert("Se leyeron " + clinicas.length + " clinicas");
}

function evaluarClinica(voto) {

    //Sumamos a los valores existentes
    var resultado = false;

    //alert("Antes de LEER DATA");
    //var cantidad = leerData();
    leerData();

    //alert("DESPUES DE LEER DATA cantidad es " + cantidad.length);

    //alert('el voto es para la clinica con ID numero ' + voto.id);

    return resultado;
}

function registrarClinica(clinica){
    var resultado = false;
    return resultado;
}