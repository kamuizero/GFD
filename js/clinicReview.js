/**
 * Created by aureliopinero on 2017/01/12.
 */

$(document).ready(function () {

    //TODO: Edicion y evaluacion de la clinica y institucion de salud

    obtenerClinica();
});

/* VARIABLES */

var activeInfoWindow;
var marker;

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
        '<br><br>' +
        'Languages: ' +
        //'<p><a href="clinicReview.html?clinic=' + m2 + '">'+
        '<p><a href="#" title="Click to add clinic review" onclick="reviewClinic(); return false;">'+
        'Review clinic</a></p>';
    return html;
}

function obtenerClinica() {
    feature = JSON.parse(localStorage.getItem('clinica'));

    if (feature != null) {

        var langLevel;

        initMap(feature);

        $("#divNombreClinica").text(feature.title);

        $("#divDireccionClinica").text(feature.description);

        /* Load languages ratings */

        langLevel = evaluarIdioma('ingles');

        $("#divIngles").text('Percentile for staff: ' + langLevel.staff + '  ' +
            'Percentile for doctor: ' + langLevel.doctor);

        langLevel = evaluarIdioma('chino');

        $("#divChino").text('Percentile for staff: ' + langLevel.staff  + '  ' +
            'Percentile for doctor: ' + langLevel.doctor);

        langLevel = evaluarIdioma('coreano');

        $("#divCoreano").text('Percentile for staff: ' + langLevel.staff + '  ' +
            'Percentile for doctor: ' + langLevel.doctor);

        langLevel = evaluarIdioma('espanol');

        $("#divEspanol").text('Percentile for staff: ' + langLevel.staff + '  ' +
            'Percentile for doctor: ' + langLevel.doctor);

        langLevel = evaluarIdioma('otro');

        $("#divOtroIdioma").text('Percentile for staff: ' + langLevel.staff + '  ' +
            'Percentile for doctor: ' + langLevel.doctor);

        /* Load Doctor's friendliness level */
        //TODO: Mostrarlo como estrellas

        $("#divRatingActitud").text(evaluarRating());



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

    //Calculamos el porcentaje de cada uno
    porcentajeTotalDoctor = (positivoDoctor+negativoDoctor)/2;
    porcentajeTotalStaff = (positivoStaff+negativoStaff)/2;

    return {
        doctor : porcentajeTotalDoctor + '%',
        staff : porcentajeTotalStaff + '%'
    }
}

function evaluarRating() {
    //Promedio ponderado
    var round = Math.round();
    var L1, L2, L3;

    L1 = round(marker.friendlyL1);
    L2 = round(marker.friendlyL2);
    L3 = round(marker.friendlyL3);

    var suma = L1+L2+L3;

    return (suma==0)?0:( ((3*L3) + (2*L2) + (L1))/(suma) );
}