/**
 * Created by aureliopinero on 2017/01/12.
 */

$(document).ready(function () {

    //TODO: Edicion y evaluacion de la clinica y institucion de salud

    //Hacemos invisible el boton
    hideButton("botonReview");
    hideButton("botonClear");
    obtenerClinica();
});

/* VARIABLES */

var activeInfoWindow;
var marker;
var ratingUsuarioInglesDoc, ratingUsuarioChinoDoc, ratingUsuarioEspanolDoc, ratingUsuarioCoreanoDoc, ratingUsuarioOtroDoc,
    ratingUsuarioInglesStaff, ratingUsuarioChinoStaff, ratingUsuarioEspanolStaff, ratingUsuarioCoreanoStaff, ratingUsuarioOtroStaff,
    ratingUsuarioFL, ratingUsuarioIndicaciones;

function initMap(feature) {

    var posicionInicial = feature.position;

    mapa = new google.maps.Map(document.getElementById('mapaClinica'), {
        zoom: 17,
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

    marker = new google.maps.Marker({
        id: feature.id,
        description:feature.description,
        position: feature.position,
        map: mapa,
        title: feature.title,
        type: feature.type,
        icon: feature.icon,

        /* Doctor */

        doctorSpeaksEnglishTrue: feature.doctorSpeaksEnglishTrue, //Doctor habla ingles - Votos positivos
        doctorSpeaksEnglishFalse: feature.doctorSpeaksEnglishFalse, //Doctor habla ingles - Votos negativos

        doctorSpeaksChineseTrue: feature.doctorSpeaksChineseTrue, //Doctor habla Chino - Votos positivos
        doctorSpeaksChineseFalse: feature.doctorSpeaksChineseFalse, //Doctor habla Chino - Votos negativos

        doctorSpeaksKoreanTrue: feature.doctorSpeaksKoreanTrue, //Doctor habla Coreano - Votos positivos
        doctorSpeaksKoreanFalse: feature.doctorSpeaksKoreanFalse, //Doctor habla Coreano - Votos negativos

        doctorSpeaksSpanishTrue: feature.doctorSpeaksSpanishTrue, //Doctor habla Espanol - Votos positivos
        doctorSpeaksSpanishFalse: feature.doctorSpeaksSpanishFalse, //Doctor habla Espanol - Votos negativos

        doctorSpeaksOtherTrue: feature.doctorSpeaksOtherTrue, //Doctor habla Otro idioma - Votos positivos
        doctorSpeaksOtherFalse: feature.doctorSpeaksOtherFalse, //Doctor habla Otro idioma - Votos negativos

        /* Personal */

        staffSpeaksEnglishTrue: feature.staffSpeaksEnglishTrue, //Personal habla ingles - Votos positivos
        staffSpeaksEnglishFalse: feature.staffSpeaksEnglishFalse, //Personal habla ingles - Votos negativos

        staffSpeaksChineseTrue: feature.staffSpeaksChineseTrue, //Personal habla Chino - Votos positivos
        staffSpeaksChineseFalse: feature.staffSpeaksChineseFalse, //Personal habla Chino - Votos negativos

        staffSpeaksKoreanTrue: feature.staffSpeaksKoreanTrue, //Personal habla Coreano - Votos positivos
        staffSpeaksKoreanFalse: feature.staffSpeaksKoreanFalse, //Personal habla Coreano - Votos negativos

        staffSpeaksSpanishTrue: feature.staffSpeaksSpanishTrue, //Personal habla Espanol - Votos positivos
        staffSpeaksSpanishFalse: feature.staffSpeaksSpanishFalse, //Personal habla Espanol - Votos negativos

        staffSpeaksOtherTrue: feature.staffSpeaksOtherTrue, //Personal habla Otro idioma - Votos positivos
        staffSpeaksOtherFalse: feature.staffSpeaksOtherFalse, //Personal habla Otro idioma - Votos negativos

        /* Evaluacion */

        friendlyL1 : feature.friendlyL1, //1 Estrella
        friendlyL2 : feature.friendlyL2, //2 Estrellas
        friendlyL3 : feature.friendlyL3 , //3 Estrellas

        foreignLanguageTreatmentExplanationTrue: feature.foreignLanguageTreatmentExplanationTrue, //Ofrecen posologia o indicaciones en idioma extranjero - Votos positivos
        foreignLanguageTreatmentExplanationFalse: feature.foreignLanguageTreatmentExplanationFalse

    });

    var infowindow = new google.maps.InfoWindow();
    infowindow.setContent(crearContenido(marker));

    function toggleBounce () {
        if (marker.getAnimation() != null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }

    // this part makes the markers clickable
    google.maps.event.addListener(marker, 'click', function() {

        if(activeInfoWindow != null) activeInfoWindow.close();

        // Open InfoWindow - on click
        toggleBounce();
        infowindow.open(mapa, marker);
        setTimeout(toggleBounce, 780);

        //Guardamos la ventana para poder ocultarla luego
        activeInfoWindow = infowindow;

        //Centramos el mapa
        mapa.panTo(marker.getPosition());

    });

    infowindow.open(mapa, marker);
}

function crearContenido(marker) {

    var html = '<p style="align-content: center"><strong>' + marker.title + '</strong></p><br>' + marker.description +
        '<br><br>';
    return html;
}

function obtenerClinica() {
    var feature = JSON.parse(localStorage.getItem('clinica'));

    if (feature != null) {

        var langLevel;

        initMap(feature);

        $("#divNombreClinica").text(feature.title);

        $("#divDireccionClinica").text(feature.description);

        /* Load languages ratings */

        langLevel = evaluarIdioma('ingles');

        /*$("#inglesDoc").text('Percentile for staff: ' + langLevel.staff + ' -- ' +
            'Percentile for doctor: ' + langLevel.doctor);*/

        $("#inglesDoc").text(langLevel.doctor);
        $("#inglesStaff").text(langLevel.doctor);

        langLevel = evaluarIdioma('chino');

        $("#chinoDoc").text(langLevel.doctor);
        $("#chinoStaff").text(langLevel.doctor);

        langLevel = evaluarIdioma('coreano');

        $("#coreanoDoc").text(langLevel.doctor);
        $("#coreanoStaff").text(langLevel.doctor);

        langLevel = evaluarIdioma('espanol');

        $("#espanolDoc").text(langLevel.doctor);
        $("#espanolStaff").text(langLevel.doctor);

        langLevel = evaluarIdioma('otro');

        $("#otroDoc").text(langLevel.doctor);
        $("#otroStaff").text(langLevel.doctor);

        /* Load Doctor's friendliness level */
        //TODO: Mostrarlo como estrellas
        var el = document.querySelector('#el');

        //var clinicRating = evaluarRating();
        var clinicRating = 0.8;

        $("#divRatingActitud").text('(' + clinicRating*100 + "% positive)");

        $('.starbox').starbox({
            stars: 3, //Total de estrellas a mostrar
            buttons: 3, //Se coloca 3 para que los ratings sean 3
            average: clinicRating, //Valor inicial
            changeable: 'once',
            autoUpdateAverage: true,
            ghosting: true
        }).bind('starbox-value-changed', function(event, value) {
            var voto = value.toFixed(2);
            switch (voto) {
                case ("0.33") :
                    voto = 1;
                    break;
                case ("0.67") :
                    voto = 2;
                    break;
                case ("1.00") :
                    voto = 3;
                    break;
                default:
                    voto = 1;
                    break;
            }

            alert('Estrella Clickeada, valor a evaluar es: ' + voto);
            ratingUsuarioFL = voto;
            verificarVisibilidad();

            /*jQuery.getJSON('/my/action', {rating: value}, function(data) {
                if(!data.error) {
                    element.starbox('setOption', 'average', data.result);
                }
            });*/
        });;

        /* Prescription */

        var ratingPrescription = evaluarPrescripcion();

        if (ratingPrescription != -1) {
            $("#divRatingExplicacion").text(ratingPrescription + ' % Positive votes');
        }
        else {
            $("#divRatingExplicacion").text('No ratings yet');
        }

    }
}

function evaluarIdioma(idioma) {
    var porcentajeTotalDoctor, porcentajeTotalStaff,
        positivoDoctor, negativoDoctor,
        positivoStaff, negativoStaff;

    var round = Math.round;

    switch (idioma) {
        case 'ingles' : {
            positivoDoctor = round(marker.doctorSpeaksEnglishTrue);
            negativoDoctor = round(marker.doctorSpeaksEnglishFalse);
            positivoStaff = round(marker.staffSpeaksEnglishTrue);
            negativoStaff = round(marker.staffSpeaksEnglishFalse);
            break;
        }
        case 'chino' : {
            positivoDoctor = round(marker.doctorSpeaksChineseTrue);
            negativoDoctor = round(marker.doctorSpeaksChineseFalse);
            positivoStaff = round(marker.staffSpeaksChineseTrue);
            negativoStaff = round(marker.staffSpeaksChineseFalse);
            break;
        }
        case 'coreano' : {
            positivoDoctor = round(marker.doctorSpeaksKoreanTrue);
            negativoDoctor = round(marker.doctorSpeaksKoreanFalse);
            positivoStaff = round(marker.staffSpeaksKoreanTrue);
            negativoStaff = round(marker.staffSpeaksKoreanFalse);
            break;
        }
        case 'espanol' : {
            positivoDoctor = round(marker.doctorSpeaksSpanishTrue);
            negativoDoctor = round(marker.doctorSpeaksSpanishFalse);
            positivoStaff = round(marker.staffSpeaksSpanishTrue);
            negativoStaff = round(marker.staffSpeaksSpanishFalse);
            break;
        }
        case 'otro' : {
            positivoDoctor = round(marker.doctorSpeaksOtherTrue);
            negativoDoctor = round(marker.doctorSpeaksOtherFalse);
            positivoStaff = round(marker.staffSpeaksOtherTrue);
            negativoStaff = round(marker.staffSpeaksOtherFalse);
            break;
        }
        default : {
            return {doctor : 0, staff: 0};
        }
    }

    //TODO: Esto es una solucion temporal

    //Calculamos el porcentaje de cada uno
    if (positivoDoctor > 0 || negativoDoctor > 0) {
        porcentajeTotalDoctor = (positivoDoctor/(positivoDoctor+negativoDoctor))*100;
    }
    else {
        porcentajeTotalDoctor = -1;
    }

    if (positivoStaff > 0 || negativoStaff > 0) {
        porcentajeTotalStaff = (positivoStaff/(positivoStaff+negativoStaff))*100;
    }
    else {
        porcentajeTotalStaff = -1;
    }

    return {
        doctor : (porcentajeTotalDoctor == -1)?'No ratings yet':porcentajeTotalDoctor + ' %',
        staff : (porcentajeTotalStaff == -1)?'No ratings yet':porcentajeTotalStaff + ' %'
    }
}

function evaluarPrescripcion() {
    var round = Math.round;

    var positiveVotes = round(marker.foreignLanguageTreatmentExplanationTrue);
    var negativeVotes = round(marker.foreignLanguageTreatmentExplanationFalse);

    if (positiveVotes > 0 || negativeVotes > 0) {
        return ( (positiveVotes/(positiveVotes+negativeVotes))*100 );
    }
    else {
        return -1;
    }
}

function evaluarRating() {
    //Promedio ponderado
    var round = Math.round;
    var L1, L2, L3;

    L1 = round(marker.friendlyL1);
    L2 = round(marker.friendlyL2);
    L3 = round(marker.friendlyL3);

    var suma = L1+L2+L3;

    return (suma==0)?0:( ((3*L3) + (2*L2) + (L1))/(suma) );
}

function verificarVisibilidad() {
    if (ratingUsuarioInglesDoc==null && ratingUsuarioChinoDoc==null && ratingUsuarioEspanolDoc==null &&
        ratingUsuarioCoreanoDoc==null && ratingUsuarioOtroDoc==null && ratingUsuarioInglesStaff==null &&
        ratingUsuarioChinoStaff==null && ratingUsuarioEspanolStaff==null && ratingUsuarioCoreanoStaff==null &&
        ratingUsuarioOtroStaff==null && ratingUsuarioFL==null && ratingUsuarioIndicaciones== null &&
        ratingUsuarioFL == null) {
        hideButton('botonReview');
        hideButton('botonClear');
    }
    else{
        showButton('botonReview');
        showButton('botonClear');
    }
}

function hover(element) {
    if (grupoYaEstaClickeado()) {

    }
    else{
        element.setAttribute('src', 'res/img/like-color.png');
    }
}

function unhover(element) {
    element.setAttribute('src', 'res/img/like-white.png');
}

function clickThumb(element) {
    //alert("El usuario hizo click en el elemento: " + element.getAttribute('id') + ' - ' + element.getAttribute('name') +
    //       ' valor: ' + element.getAttribute('value') + ' Checked: ' + element.checked);

    //TODO: Hacer que cuando ya esta clickeado y le vuelve a dar, se deschequee, o simplemente poner un boton de CLEAR
    var idioma = element.getAttribute('name'); //Obtenemos el idioma a donde le dio click
    var voto = element.getAttribute('value');

    switch (idioma) {
            case 'votoInglesDoc' :
                if ((ratingUsuarioInglesDoc!=null) && (ratingUsuarioInglesDoc == voto)) { //Ya esta clickeado
                    element.checked = false;
                    ratingUsuarioInglesDoc = null;
                }
                else {
                    ratingUsuarioInglesDoc = voto;
                }
                break;
            case 'votoInglesStaff' :
                if ((ratingUsuarioInglesStaff!=null) && (ratingUsuarioInglesStaff == voto)) { //Ya esta clickeado
                    element.checked = false;
                    ratingUsuarioInglesStaff = null;
                }
                else {
                    ratingUsuarioInglesStaff = voto;
                }
                break;
            case 'votoChinoDoc' :
                if ((ratingUsuarioChinoDoc!=null) && (ratingUsuarioChinoDoc == voto)) { //Ya esta clickeado
                    element.checked = false;
                    ratingUsuarioChinoDoc = null;
                }
                else {
                    ratingUsuarioChinoDoc  = voto;
                }
                break;
            case 'votoChinoStaff' :
                if ((ratingUsuarioChinoStaff !=null) && (ratingUsuarioChinoStaff == voto)) { //Ya esta clickeado
                    element.checked = false;
                    ratingUsuarioChinoStaff = null;
                }
                else {
                    ratingUsuarioChinoStaff = voto;
                }
                break;
            case 'votoCoreanoDoc' :
                if ((ratingUsuarioCoreanoDoc !=null) && (ratingUsuarioCoreanoDoc == voto)) { //Ya esta clickeado
                    element.checked = false;
                    ratingUsuarioCoreanoDoc = null;
                }
                else {
                    ratingUsuarioCoreanoDoc = voto;
                }
                break;
            case 'votoCoreanoStaff' :
                if ((ratingUsuarioCoreanoStaff !=null) && (ratingUsuarioCoreanoStaff == voto)) { //Ya esta clickeado
                    element.checked = false;
                    ratingUsuarioCoreanoStaff = null;
                }
                else {
                    ratingUsuarioCoreanoStaff = voto;
                }
                break;
            case 'votoEspanolDoc' :
                if ((ratingUsuarioEspanolDoc !=null) && (ratingUsuarioEspanolDoc == voto)) { //Ya esta clickeado
                    element.checked = false;
                    ratingUsuarioEspanolDoc = null;
                }
                else {
                    ratingUsuarioEspanolDoc = voto;
                }
                break;
            case 'votoEspanolStaff' :
                if ((ratingUsuarioEspanolStaff !=null) && (ratingUsuarioEspanolStaff == voto)) { //Ya esta clickeado
                    element.checked = false;
                    ratingUsuarioEspanolStaff = null;
                }
                else {
                    ratingUsuarioEspanolStaff = voto;
                }
                break;
            case 'votoOtroDoc' :
                if ((ratingUsuarioOtroDoc !=null) && (ratingUsuarioOtroDoc == voto)) { //Ya esta clickeado
                    element.checked = false;
                    ratingUsuarioOtroDoc = null;
                }
                else {
                    ratingUsuarioOtroDoc = voto;
                }
                break;
            case 'votoOtroStaff' :
                if ((ratingUsuarioOtroStaff !=null) && (ratingUsuarioOtroStaff == voto)) { //Ya esta clickeado
                    element.checked = false;
                    ratingUsuarioOtroStaff = null;
                }
                else {
                    ratingUsuarioOtroStaff = voto;
                }
                break;
            default: break;
    }

    //Verificamos si hacer visible el boton o no
    verificarVisibilidad();
}

function showButton(boton) {
    document.getElementById(boton).style.display = "inline";
}

function hideButton(boton){
    document.getElementById(boton).style.display = "none";
}

function reviewClinic() {

    //Debemos tomar todos los cambios nuevos

    //Primero evaluacion de idiomas


    //Nivel de amistosidad del doctor


    //Voto de indicaciones


    //Persistir los datos

}