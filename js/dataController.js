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

function evaluarClinica(actualizacion) {
    updateInstance(actualizacion);
}

function registrarClinica(clinica){
    var resultado = false;
    return resultado;
}