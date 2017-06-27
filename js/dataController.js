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

function leerClinicasVirtuoso(){
    //Ejecutar el query inicial que trae todas las clinicas
    var grafo = "http://lod.mdg/";
    var query="PREFIX lkd:<http://linkdata.org/property/rdf1s4853i> select * from <" + grafo + "> " +
        "where { " +
        "?clinica ?atributo ?valor. " +
        "FILTER(!strstarts(str(?clinica), str(<http://linkdata.org/property/>)) " +
        "&& str(?clinica) != <>) " +
        "}" +
        " ORDER BY DESC (?clinica)";
    var data = sparqlQuery(query, "http://127.0.0.1:8890/sparql/");
    //console.log(data);
    return crearArreglo(data);
}

//Armamos el arreglo
function crearArreglo(re) {
    var clinicas = [];
    var lat, long;

    //Aqui generamos los objetos particulares con cada uno de sus atributos

    var clinica;

    for (i = 0; i < re.results.bindings.length; i++) {

        var atributo = re.results.bindings[i].atributo.value.split("#")[1];
        var valor = re.results.bindings[i].valor.value;
        var id = re.results.bindings[i].clinica.value.split("#")[1]; //Unicamente el ID

        if (!clinica)
            clinica = { id: id, type: "health"};
        else if (id != clinica.id) { //Nueva clinica
            clinica["position"] = new google.maps.LatLng(clinica.lat, clinica.long);
            clinicas.push(clinica);
            clinica = { id: id, type: "health"};
        }

        clinica[atributo] = valor; //Agregamos el valor a la clinica
    }

    return clinicas;
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