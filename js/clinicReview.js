/**
 * Created by aureliopinero on 2017/01/12.
 */

$(document).ready(function () {

    //TODO: Edicion y evaluacion de la clinica y institucion de salud

    obtenerClinica();
});

function initMap() {

    map = new google.maps.Map(document.getElementById('mapaClinica'), {
        zoom: 6,
        //center: uluru,
        center: posicionInicial,
        mapTypeControl: false,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        scaleControl: true,
        streetViewControl: false
    });

    //Cargar el marcador
}

function obtenerClinica() {
    var feature = JSON.parse(localStorage.getItem('clinica'));

    if (feature != null) {
        $("#divNombreClinica").text(feature.title);

        $("#divDireccionClinica").text(feature.description);



    }
}