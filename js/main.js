/**
 * Created by Aurelio on 30/12/2016.
 */
$(document).ready(function () {
    initMap();

    //TODO: Incluir el menu nuevo
    //TODO: Funcionalidad de Explorar por region donde hay extranjeros por nacionalidad y cuantos hospitales para extranjeros (Algo asi como ESTA es la region mas gaijin friendly
    //TODO: Plus alfa de elegir el datasource ya sea el archivo de LinkData o el servidor Sparql (del laboratorio)
});

$.getScript("http://lodcu.cs.chubu.ac.jp/SparqlEPCU/RDFmgr/rdfmgr-2.0.0.js", function() {
});

//////////////////////////////
///// Variables globales /////
//////////////////////////////

var posicionInicial = {lat: 35.1547072, lng: 136.9613086}; //Aichi

var icons = {
    health: {
        icon: 'res/icon/health_icon.png'
    },
    clinic: {
        icon: 'res/icon/clinic_icon.png'
    },
    hospital: {
        icon: 'res/icon/hospital_icon.png'
    }
};
var map;

var allMarkersData =[];
var activeInfoWindow;
var activeMarker;

//////////////////////////////

//===================
// Funciones del Menu
//===================

function abrirMenu(evt, menuName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(menuName).style.display = "block";
    evt.currentTarget.className += " active";
}

//=============================================
//Funcion que inicializa el mapa de Google Maps
//=============================================

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
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

    //cargarClinicas();
    llamarClinicasRDF();
}

//================================================
//Funcion que crea el marcador y lo agrega al mapa
//================================================

function addMarkerInfoWindow(feature, mapa) {

    var image = {
        url: icons[feature.type].icon,
        scaledSize : new google.maps.Size(35, 49)
    };

    var marker = new google.maps.Marker({
        id: feature.id,
        //description:feature.description, NORMAL
        description:feature.address, //RDF
        position: feature.position,
        map: mapa,
        //title: feature.title, NORMAL
        title: feature.name, //RDF
        type: feature.type,
        icon: image,

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

        FriendlyL1 : feature.FriendlyL1, //1 Estrella
        FriendlyL2 : feature.FriendlyL2, //2 Estrellas
        FriendlyL3 : feature.FriendlyL3 , //3 Estrellas

        ForeignLanguageTreatmentExplanationTrue: feature.ForeignLanguageTreatmentExplanationTrue, //Ofrecen posologia o indicaciones en idioma extranjero - Votos positivos
        ForeignLanguageTreatmentExplanationFalse: feature.ForeignLanguageTreatmentExplanationFalse
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

    // Hacer que el marcador se pueda clickear
    google.maps.event.addListener(marker, 'click', function() {

        if(activeInfoWindow != null) activeInfoWindow.close();

        // Open InfoWindow - on click
        toggleBounce();
        infowindow.open(map, marker);
        setTimeout(toggleBounce, 780);

        //Guardamos la ventana para poder ocultarla luego
        activeInfoWindow = infowindow;
        activeMarker = marker;

        //Centramos el mapa
        //map.setCenter(marker.getPosition());
        map.panTo(marker.getPosition());

    });

    //Agregamos el marcador a la lista total
    allMarkersData.push(marker);
    return(marker);
}

function crearContenido(marker) {

    var ingles, chino, coreano, espanol, otro;

    ingles = evaluarIdioma('ingles',marker);
    chino = evaluarIdioma('chino',marker);
    coreano = evaluarIdioma('coreano',marker);
    espanol = evaluarIdioma('espanol',marker);
    otro = evaluarIdioma('otro',marker);

    if ( ((ingles.doctor!='0 %') && (ingles.doctor!='No ratings yet'))  ||
        ( (ingles.staff!='No ratings yet') && (ingles.staff!='0 %')) ) {
        ingles = '&nbsp; <img src="res/img/lang/united-states.png" class="resize"/> ';
    }
    else {
        ingles = '';
    }

    if ( ((chino.doctor!='0 %') && (chino.doctor!='No ratings yet'))  ||
        ( (chino.staff!='No ratings yet') && (chino.staff!='0 %')) ) {
        chino = '&nbsp; <img src="res/img/lang/china.png" class="resize"/> ';
    }
    else {
        chino = '';
    }

    if ( ((coreano.doctor!='0 %') && (coreano.doctor!='No ratings yet'))  ||
        ( (coreano.staff!='No ratings yet') && (coreano.staff!='0 %')) ) {
        coreano = '&nbsp; <img src="res/img/lang/south-korea.png" class="resize"/> ';
    }
    else {
        coreano = '';
    }

    if ( ((espanol.doctor!='0 %') && (espanol.doctor!='No ratings yet'))  ||
        ( (espanol.staff!='No ratings yet') && (espanol.staff!='0 %')) ) {
        espanol = '&nbsp; <img src="res/img/lang/spain.png" class="resize"/> ';
    }
    else {
        espanol = '';
    }

    if ( ((otro.doctor!='0 %') && (otro.doctor!='No ratings yet'))  ||
        ( (otro.staff!='No ratings yet') && (otro.staff!='0 %')) ) {
        otro = '&nbsp; <img src="res/img/lang/hospital.png" class="resize"/> ';
    }
    else {
        otro = '';
    }

    //TODO: Mejorar el formato del infowindow http://en.marnoto.com/2014/09/5-formas-de-personalizar-infowindow.html

    var html = '<p style="align-content: center"><strong>' + marker.title + '</strong></p><br>' + marker.description +
        '<br><br>' +
        'Languages: ' +
        '<div> <img src="res/img/lang/japan.png" class="resize"/> ' + ingles + chino + coreano + espanol + otro +
        '</div>' +
        '<p><a href="#" title="Click to add clinic review" onclick="reviewClinic(); return false;">'+
        'Review clinic</a></p>';
    return html;
}

function reviewClinic() {
    var x = markerASimpleBase(activeMarker);
    localStorage.setItem('clinica',JSON.stringify(x));
    location.assign('clinicReview.html');
}

function markerASimpleBase(marker) {
    var ret = {
        id: marker.id,
        description: marker.description,
        position: marker.position,
        title: marker.title,
        type: marker.type,
        icon: marker.icon,

        doctorSpeaksEnglishTrue: marker.doctorSpeaksEnglishTrue, //Doctor habla ingles - Votos positivos
        doctorSpeaksEnglishFalse: marker.doctorSpeaksEnglishFalse, //Doctor habla ingles - Votos negativos

        doctorSpeaksChineseTrue: marker.doctorSpeaksChineseTrue, //Doctor habla Chino - Votos positivos
        doctorSpeaksChineseFalse: marker.doctorSpeaksChineseFalse, //Doctor habla Chino - Votos negativos

        doctorSpeaksKoreanTrue: marker.doctorSpeaksKoreanTrue, //Doctor habla Coreano - Votos positivos
        doctorSpeaksKoreanFalse: marker.doctorSpeaksKoreanFalse, //Doctor habla Coreano - Votos negativos

        doctorSpeaksSpanishTrue: marker.doctorSpeaksSpanishTrue, //Doctor habla Espanol - Votos positivos
        doctorSpeaksSpanishFalse: marker.doctorSpeaksSpanishFalse, //Doctor habla Espanol - Votos negativos

        doctorSpeaksOtherTrue: marker.doctorSpeaksOtherTrue, //Doctor habla Otro idioma - Votos positivos
        doctorSpeaksOtherFalse: marker.doctorSpeaksOtherFalse, //Doctor habla Otro idioma - Votos negativos

        /* Personal */

        staffSpeaksEnglishTrue: marker.staffSpeaksEnglishTrue, //Personal habla ingles - Votos positivos
        staffSpeaksEnglishFalse: marker.staffSpeaksEnglishFalse, //Personal habla ingles - Votos negativos

        staffSpeaksChineseTrue: marker.staffSpeaksChineseTrue, //Personal habla Chino - Votos positivos
        staffSpeaksChineseFalse: marker.staffSpeaksChineseFalse, //Personal habla Chino - Votos negativos

        staffSpeaksKoreanTrue: marker.staffSpeaksKoreanTrue, //Personal habla Coreano - Votos positivos
        staffSpeaksKoreanFalse: marker.staffSpeaksKoreanFalse, //Personal habla Coreano - Votos negativos

        staffSpeaksSpanishTrue: marker.staffSpeaksSpanishTrue, //Personal habla Espanol - Votos positivos
        staffSpeaksSpanishFalse: marker.staffSpeaksSpanishFalse, //Personal habla Espanol - Votos negativos

        staffSpeaksOtherTrue: marker.staffSpeaksOtherTrue, //Personal habla Otro idioma - Votos positivos
        staffSpeaksOtherFalse: marker.staffSpeaksOtherFalse, //Personal habla Otro idioma - Votos negativos

        /* Evaluacion */

        FriendlyL1 : marker.FriendlyL1, //1 Estrella
        FriendlyL2 : marker.FriendlyL2, //2 Estrellas
        FriendlyL3 : marker.FriendlyL3, //3 Estrellas

        ForeignLanguageTreatmentExplanationTrue: marker.ForeignLanguageTreatmentExplanationTrue, //Ofrecen posologia o indicaciones en idioma extranjero - Votos positivos
        ForeignLanguageTreatmentExplanationFalse: marker.ForeignLanguageTreatmentExplanationFalse
    };

    return ret;
}

function evaluarIdioma(idioma, marker) {
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

function llamarClinicasRDF() {
    leerData();
}

function cargarClinicasRDF(clinicas) {
    //Finalizo carga del RDF, mostrarlas como marcadores en el mapa
    for (var k = 0, clinicaP; clinicaP = clinicas[k]; k++) {
        addMarkerInfoWindow(clinicaP,map);
    }
}

function cargarClinicas(){

    var this_data_list = [];

    //var url = "http://linkdata.org/api/1/rdf1s268i/nagoyahospital_rdf.json?callback=?";
    var url = "http://linkdata.org/api/1/rdf1s4853i/Gaikokujin_friendly_clinic_rdf.json?callback=?";
    //var url = "http://linkdata.org/api/1/rdf1s3965i/hospital_list_rdf.json?callback=?";

    $.getJSON(url, function(data) {
        var subject_list = Object.keys(data);
        var property_list = Object.keys(data[subject_list[0]]);
        var latNum = 0;
        var lngNum = 0;

        for (var p = 1; p < property_list.length; p++) { //1は連番だから無い

            var x = shortenProperty(property_list[p]);

            if (x == "lat" || x == "Lat" || x == "latitude" || x == "Latitude" || x == "緯度" ||
                    x.toLocaleLowerCase().includes("lat") ) {
                latNum = p;
            }

            if (x == "lng" || x == "Lng" || x == "long" || x == "longitude" || x == "Longitude" || x == "経度") {
                lngNum = p;
            }
        }

        if (latNum == 0 || lngNum == 0) {
            //alert("Unable to load hospital location data");
        } else {
            //alert("Data loaded successfully");
            //this_data_list.push(iconid);//アイコンのid
            this_data_list.push(subject_list.length); //行数
            this_data_list.push(property_list.length); //列数
            this_data_list.push(latNum); //緯度の前からの位置(データ属性を除く)
            this_data_list.push(lngNum); //経度の前からの位置(データ属性を除く)

            //Guardar los datos en el arreglo
            for (var i = 0; i < subject_list.length; i++) {
                var this_objects = data[subject_list[i]];
                var this_subject_list = Object.keys(data[subject_list[i]]);
                var this_object_list = [];

                for (var j = 0; j < this_subject_list.length; j++) {
                    this_object_list.push(this_objects[this_subject_list[j]][0].value);
                }

                this_data_list.push(this_object_list);
            }

            var clinicas =[];

            //Generamos la lista de clinicas para el mapa
            for (var j = 4; j < this_data_list.length; j++){

                //Creamos el marcador con la data obtenida
                var clinica = {
                    position: new google.maps.LatLng(Number(this_data_list[j][3]), Number(this_data_list[j][4])),
                    type: 'health',
                    id: this_data_list[j][0], //ID dentro de la lista de clinicas
                    name: this_data_list[j][1], //Nombre
                    address: this_data_list[j][2], //Direccion

                    /* Doctor */

                    doctorSpeaksEnglishTrue: this_data_list[j][5], //Doctor habla ingles - Votos positivos
                    doctorSpeaksEnglishFalse: this_data_list[j][6], //Doctor habla ingles - Votos negativos

                    doctorSpeaksChineseTrue: this_data_list[j][7], //Doctor habla Chino - Votos positivos
                    doctorSpeaksChineseFalse: this_data_list[j][8], //Doctor habla Chino - Votos negativos

                    doctorSpeaksKoreanTrue: this_data_list[j][9], //Doctor habla Coreano - Votos positivos
                    doctorSpeaksKoreanFalse: this_data_list[j][10], //Doctor habla Coreano - Votos negativos

                    doctorSpeaksSpanishTrue: this_data_list[j][11], //Doctor habla Espanol - Votos positivos
                    doctorSpeaksSpanishFalse: this_data_list[j][12], //Doctor habla Espanol - Votos negativos

                    doctorSpeaksOtherTrue: this_data_list[j][13], //Doctor habla Otro idioma - Votos positivos
                    doctorSpeaksOtherFalse: this_data_list[j][14], //Doctor habla Otro idioma - Votos negativos

                    /* Personal */

                    staffSpeaksEnglishTrue: this_data_list[j][15], //Personal habla ingles - Votos positivos
                    staffSpeaksEnglishFalse: this_data_list[j][16], //Personal habla ingles - Votos negativos

                    staffSpeaksChineseTrue: this_data_list[j][17], //Personal habla Chino - Votos positivos
                    staffSpeaksChineseFalse: this_data_list[j][18], //Personal habla Chino - Votos negativos

                    staffSpeaksKoreanTrue: this_data_list[j][19], //Personal habla Coreano - Votos positivos
                    staffSpeaksKoreanFalse: this_data_list[j][20], //Personal habla Coreano - Votos negativos

                    staffSpeaksSpanishTrue: this_data_list[j][21], //Personal habla Espanol - Votos positivos
                    staffSpeaksSpanishFalse: this_data_list[j][22], //Personal habla Espanol - Votos negativos

                    staffSpeaksOtherTrue: this_data_list[j][23], //Personal habla Otro idioma - Votos positivos
                    staffSpeaksOtherFalse: this_data_list[j][24], //Personal habla Otro idioma - Votos negativos

                    /* Evaluacion */

                    FriendlyL1:this_data_list[j][25], //1 Estrella
                    FriendlyL2:this_data_list[j][26], //2 Estrellas
                    FriendlyL3:this_data_list[j][27], //3 Estrellas

                    ForeignLanguageTreatmentExplanationTrue: this_data_list[j][28], //Ofrecen posologia o indicaciones en idioma extranjero - Votos positivos
                    ForeignLanguageTreatmentExplanationFalse: this_data_list[j][29] //Ofrecen posologia o indicaciones en idioma extranjero - Votos negativos
                };

                //Agregamos al arreglo de Marcadores
                clinicas.push(clinica);
            }

            //Ahora si, a cargarlas en el mapa
            for (var k = 0, feature; feature = clinicas[k]; k++) {
                addMarkerInfoWindow(feature,map);
            }

        }
    });
}

function shortenProperty(thisProperty) {
    return (thisProperty.split("#")[thisProperty.split("#").length - 1])
}

//Funcion para hacer aparecer y desaparecer los marcadores
function Markers(type){
    var newValue = document.getElementById(type).checked;
    activeInfoWindow.close();

    for (var i=0;i<allMarkersData.length;i++) {
        if (allMarkersData[i].type==type)  {
            if (newValue==0) {
                allMarkersData[i].setVisible(false);
            }
            else {
                allMarkersData[i].setVisible(true);

            }
        }
    }

}