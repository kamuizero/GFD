/**
 * Created by aureliopinero on 2017/01/12.
 */

$(document).ready(function () {

    //TODO: Edicion y evaluacion de la clinica y institucion de salud

    obtenerClinica();
});

function obtenerClinica() {
    var feature = JSON.parse(localStorage.getItem('clinica'));

    if (feature != null) {
        $("#divNombreClinica").text(feature.title);

        $("#divDireccionClinica").text(feature.description);



    }
}