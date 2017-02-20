/**
 * Created by Aurelio on 2017/02/09.
 */
//===================
// VARIABLES GLOBALES
//===================

var ratingUsuarioInglesDoc, ratingUsuarioChinoDoc, ratingUsuarioEspanolDoc, ratingUsuarioCoreanoDoc, ratingUsuarioOtroDoc,
    ratingUsuarioInglesStaff, ratingUsuarioChinoStaff, ratingUsuarioEspanolStaff, ratingUsuarioCoreanoStaff, ratingUsuarioOtroStaff,
    ratingUsuarioFL, ratingUsuarioIndicaciones;
var mapa, marker;
var nombreClinica, direccionClinica;
var atributosTotales;
var atributosExitosos = 0;
var atributosFallidos = 0;

//===================
//METODOS Y FUNCIONES
//===================
function showButton(boton) {
    document.getElementById(boton).style.display = "inline";
}

function hideButton(boton){
    document.getElementById(boton).style.display = "none";
}

function displayMap(element) {
    if (!element.value) {
        // alert('Please enter an address');
        direccionClinica = null;
        // element.focus();   // <======= why isn't this having any effect??
    }
    else {
        direccionClinica = element.value
        obtenerCoordenadas(direccionClinica);
    }
}

function init() {
    loadStars();
}

function loadStars() {

    $('.starbox').starbox({
        stars: 3, //Total de estrellas a mostrar
        buttons: 3, //Se coloca 3 para que los ratings sean 3
        average: 0, //Valor inicial
        changeable: true,
        // changeable: 'once',
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

        ratingUsuarioFL = voto;
        verificarVisibilidad();
    });

}

function clickThumb(element) {

    var nombre = element.getAttribute('name'); //Obtenemos el idioma a donde le dio click
    var voto = element.getAttribute('value');

    switch (nombre) {
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
        case 'votoIndicacion' :
            if ((ratingUsuarioIndicaciones !=null) && (ratingUsuarioIndicaciones == voto)) { //Ya esta clickeado
                element.checked = false;
                ratingUsuarioIndicaciones = null;
            }
            else {
                ratingUsuarioIndicaciones = voto;
            }
            break;
        default: break;
    }

    //Verificamos si hacer visible el boton o no
    verificarVisibilidad();
}

function verificarVisibilidad() {
    if (ratingUsuarioInglesDoc==null && ratingUsuarioChinoDoc==null && ratingUsuarioEspanolDoc==null &&
        ratingUsuarioCoreanoDoc==null && ratingUsuarioOtroDoc==null && ratingUsuarioInglesStaff==null &&
        ratingUsuarioChinoStaff==null && ratingUsuarioEspanolStaff==null && ratingUsuarioCoreanoStaff==null &&
        ratingUsuarioOtroStaff==null && ratingUsuarioFL==null && ratingUsuarioIndicaciones== null &&
        ratingUsuarioFL == null && marker == null && nombreClinica == null && direccionClinica == null) {
        hideButton('botonAdd');
        hideButton('botonClearC');
    }
    else {
        showButton('botonAdd');
        showButton('botonClearC');
    }
}

function clearInput() {
    resetThumbs(); //Resetear los pulgares
    resetStars(); //Resetear las estrellas
    verificarVisibilidad();
}

function resetThumbs() {

    ratingUsuarioInglesDoc = ratingUsuarioChinoDoc = ratingUsuarioEspanolDoc = ratingUsuarioCoreanoDoc = ratingUsuarioOtroDoc =
        ratingUsuarioInglesStaff = ratingUsuarioChinoStaff = ratingUsuarioEspanolStaff = ratingUsuarioCoreanoStaff = ratingUsuarioOtroStaff =
            ratingUsuarioIndicaciones = null;

    //Idiomas
    document.getElementsByName("votoInglesDoc")[0].checked = false;
    document.getElementsByName("votoInglesDoc")[1].checked = false;

    document.getElementsByName("votoInglesStaff")[0].checked = false;
    document.getElementsByName("votoInglesStaff")[1].checked = false;

    document.getElementsByName("votoChinoDoc")[0].checked = false;
    document.getElementsByName("votoChinoDoc")[1].checked = false;

    document.getElementsByName("votoChinoStaff")[0].checked = false;
    document.getElementsByName("votoChinoStaff")[1].checked = false;

    document.getElementsByName("votoCoreanoDoc")[0].checked = false;
    document.getElementsByName("votoCoreanoDoc")[1].checked = false;

    document.getElementsByName("votoCoreanoStaff")[0].checked = false;
    document.getElementsByName("votoCoreanoStaff")[1].checked = false;

    document.getElementsByName("votoEspanolDoc")[0].checked = false;
    document.getElementsByName("votoEspanolDoc")[1].checked = false;

    document.getElementsByName("votoEspanolStaff")[0].checked = false;
    document.getElementsByName("votoEspanolStaff")[1].checked = false;

    document.getElementsByName("votoOtroDoc")[0].checked = false;
    document.getElementsByName("votoOtroDoc")[1].checked = false;

    document.getElementsByName("votoOtroStaff")[0].checked = false;
    document.getElementsByName("votoOtroStaff")[1].checked = false;

    //Indicaciones

    document.getElementsByName("votoIndicacion")[0].checked = false;
    document.getElementsByName("votoIndicacion")[1].checked = false;

}

function resetStars() {

    var starB = $('.starbox');

    ratingUsuarioFL = null;
    starB.starbox('destroy', null);

    //Regeneramos el rating
    starB.starbox({
        stars: 3, //Total de estrellas a mostrar
        buttons: 3, //Se coloca 3 para que los ratings sean 3
        average: 0, //Valor inicial
        changeable: true,
        autoUpdateAverage: true,
        ghosting: true
    });

}

function addClinic() {

    $("#Loading").show();

    var ok = true;

    //Agarrar los valores
    console.log("Nombre de la clinica :" + nombreClinica);
    console.log("Direccion de la clinica :" + direccionClinica);

    if (marker != null) {
        console.log("Coordenadas de la clinica - Latitud: " + marker.position.lat() +
            " Longitud: " + marker.position.lng());
    }

    //Validar

    if (nombreClinica == undefined) {
        alert('クリニックの名前を入力してください - Please input a clinic name');
        ok = false;
    }
    else if (direccionClinica == undefined) {
        alert('クリニックの住所を入力してください - Please enter an address');
        ok = false;
    }
    else if (marker == null) {
        alert('地図にクリニックの位置を設定してください - Please pick a location on the map');
        ok = false;
    }

    //Agregar

    if (ok) {
        console.log('Agregar la clinica');

        marker["title"] = nombreClinica;
        marker["description"] = direccionClinica;

        //Ingles Doctor
        if (ratingUsuarioInglesDoc == null || ratingUsuarioInglesDoc== undefined) {
            marker["doctorSpeaksEnglishTrue"] = 0;
            marker["doctorSpeaksEnglishFalse"] = 0;
        }
        else if (ratingUsuarioInglesDoc=='up') { //Positivo
            marker["doctorSpeaksEnglishTrue"] = 1;
            marker["doctorSpeaksEnglishFalse"] = 0;
        }
        else { //Negativo
            marker["doctorSpeaksEnglishTrue"] = 0;
            marker["doctorSpeaksEnglishFalse"] = 1;
        }

        //Ingles Staff
        if (ratingUsuarioInglesStaff == null || ratingUsuarioInglesStaff== undefined) {
            marker["staffSpeaksEnglishTrue"] = 0;
            marker["staffSpeaksEnglishFalse"] = 0;
        }
        else if (ratingUsuarioInglesStaff=='up') { //Positivo
            marker["staffSpeaksEnglishTrue"] = 1;
            marker["staffSpeaksEnglishFalse"] = 0;
        }
        else { //Negativo
            marker["staffSpeaksEnglishFalse"] = 1;
            marker["staffSpeaksEnglishTrue"] = 0;
        }

        //Chino Doctor
        if (ratingUsuarioChinoDoc == null || ratingUsuarioChinoDoc== undefined) {
            marker["doctorSpeaksChineseTrue"] = 0;
            marker["doctorSpeaksChineseFalse"] = 0;
        }
        else if (ratingUsuarioChinoDoc=='up') { //Positivo
            marker["doctorSpeaksChineseTrue"] = 1;
            marker["doctorSpeaksChineseFalse"] = 0;
        }
        else { //Negativo
            marker["doctorSpeaksChineseFalse"] = 1;
            marker["doctorSpeaksChineseTrue"] = 0;
        }

        //Chino Staff
        if (ratingUsuarioChinoStaff == null || ratingUsuarioChinoStaff== undefined) {
            marker["staffSpeaksChineseTrue"] = 0;
            marker["staffSpeaksChineseFalse"] = 0;
        }
        else if (ratingUsuarioChinoStaff=='up') { //Positivo
            marker["staffSpeaksChineseTrue"] = 1;
            marker["staffSpeaksChineseFalse"] = 0;
        }
        else { //Negativo
            marker["staffSpeaksChineseFalse"] = 1;
            marker["staffSpeaksChineseTrue"] = 0;
        }

        //Coreano doctor
        if (ratingUsuarioCoreanoDoc == null || ratingUsuarioCoreanoDoc== undefined) {
            marker["doctorSpeaksKoreanTrue"] = 0;
            marker["doctorSpeaksKoreanFalse"] = 0;
        }
        else if (ratingUsuarioCoreanoDoc=='up') { //Positivo
            marker["doctorSpeaksKoreanTrue"] = 1;
            marker["doctorSpeaksKoreanFalse"] = 0;
        }
        else { //Negativo
            marker["doctorSpeaksKoreanFalse"] = 1;
            marker["doctorSpeaksKoreanTrue"] = 0;
        }

        //Coreano Staff
        if (ratingUsuarioCoreanoStaff == null || ratingUsuarioCoreanoStaff== undefined) {
            marker["staffSpeaksKoreanTrue"] = 0;
            marker["staffSpeaksKoreanFalse"] = 0;
        }
        else if (ratingUsuarioCoreanoStaff=='up') { //Positivo
            marker["staffSpeaksKoreanTrue"] = 1;
            marker["staffSpeaksKoreanFalse"] = 0;
        }
        else { //Negativo
            marker["staffSpeaksKoreanFalse"] = 1;
            marker["staffSpeaksKoreanTrue"] = 0;
        }

        //Espanol doctor
        if (ratingUsuarioEspanolDoc == null || ratingUsuarioEspanolDoc== undefined) {
            marker["doctorSpeaksSpanishTrue"] = 0;
            marker["doctorSpeaksSpanishFalse"] = 0;
        }
        else if (ratingUsuarioEspanolDoc=='up') { //Positivo
            marker["doctorSpeaksSpanishTrue"] = 1;
            marker["doctorSpeaksSpanishFalse"] = 0;
        }
        else { //Negativo
            marker["doctorSpeaksSpanishFalse"] = 1;
            marker["doctorSpeaksSpanishTrue"] = 0;
        }

        //Espanol Staff
        if (ratingUsuarioEspanolStaff == null || ratingUsuarioEspanolStaff== undefined) {
            marker["staffSpeaksSpanishTrue"] = 0;
            marker["staffSpeaksSpanishFalse"] = 0;
        }
        else if (ratingUsuarioEspanolStaff=='up') { //Positivo
            marker["staffSpeaksSpanishTrue"] = 1;
            marker["staffSpeaksSpanishFalse"] = 0;
        }
        else { //Negativo
            marker["staffSpeaksSpanishFalse"] = 1;
            marker["staffSpeaksSpanishTrue"] = 0;
        }

        //Otro doctor
        if (ratingUsuarioOtroDoc == null || ratingUsuarioOtroDoc== undefined) {
            marker["doctorSpeaksOtherTrue"] = 0;
            marker["doctorSpeaksOtherFalse"] = 0;
        }
        else if (ratingUsuarioOtroDoc=='up') { //Positivo
            marker["doctorSpeaksOtherTrue"] = 1;
            marker["doctorSpeaksOtherFalse"] = 0;
        }
        else { //Negativo
            marker["doctorSpeaksOtherFalse"] = 1;
            marker["doctorSpeaksOtherTrue"] = 0;
        }

        //Otro Staff
        if (ratingUsuarioOtroStaff == null || ratingUsuarioOtroStaff== undefined) {
            marker["staffSpeaksOtherTrue"] = 0;
            marker["staffSpeaksOtherFalse"] = 0;
        }
        else if (ratingUsuarioOtroStaff=='up') { //Positivo
            marker["staffSpeaksOtherTrue"] = 1;
            marker["staffSpeaksOtherFalse"] = 0;
        }
        else { //Negativo
            marker["staffSpeaksOtherFalse"] = 1;
            marker["staffSpeaksOtherTrue"] = 0;
        }

        switch (ratingUsuarioFL) {
            case undefined||null :
                marker["FriendlyL1"]  = 0;
                marker["FriendlyL2"]  = 0;
                marker["FriendlyL3"]  = 0;
                break;
            case 1:
                marker["FriendlyL1"]  = 1;
                marker["FriendlyL2"]  = 0;
                marker["FriendlyL3"]  = 0;
                break;
            case 2:
                marker["FriendlyL1"]  = 0;
                marker["FriendlyL2"]  = 1;
                marker["FriendlyL3"]  = 0;
                break;
            case 3:
                marker["FriendlyL1"]  = 0;
                marker["FriendlyL2"]  = 0;
                marker["FriendlyL3"]  = 1;
                break;
            default: break;
        }

        //Indicaciones
        if (ratingUsuarioIndicaciones == null || ratingUsuarioIndicaciones== undefined) {
            marker["ForeignLanguageTreatmentExplanationTrue"] = 0;
            marker["ForeignLanguageTreatmentExplanationFalse"] = 0;
        }
        else if (ratingUsuarioIndicaciones=='up') { //Positivo
            marker["ForeignLanguageTreatmentExplanationTrue"] = 1;
            marker["ForeignLanguageTreatmentExplanationFalse"] = 0;
        }
        else { //Negativo
            marker["ForeignLanguageTreatmentExplanationFalse"] = 1;
            marker["ForeignLanguageTreatmentExplanationTrue"] = 0;
        }

        //Agarrar el ID

        console.log('Objeto Marker modificado');

        sparqlGetMaxClinicId();
    }
}

function finishAddClinic(id) {
    marker["id"] = id;
    console.log("La nueva clinica va a tener un id de " + id);
    $("#Loading").hide();

    //Ya aqui esta completo el objeto
    var prefijo = "http://linkdata.org/resource/rdf1s4853i#";
    var formato = "TURTLE";
    var lista = {};
    var atributo; //Sujeto, Predicado, Objeto

    // atributo = {
    //     sujeto: prefijo + id,
    //     predicado: prefijo + "name",
    //     objeto: marker.title
    // };

    lista.push({
        sujeto: prefijo + id,
        predicado: prefijo + "name",
        objeto: marker.title
    });

    lista.push({
        sujeto: prefijo + id,
        predicado: prefijo + "address",
        objeto: marker.description
    });

    lista.push({
        sujeto: prefijo + id,
        predicado: "geo:lat",
        objeto: marker.position.lat()
    });

    lista.push({
        sujeto: prefijo + id,
        predicado: "geo:long",
        objeto: marker.position.lng()
    });


    for (var i=0; i<29; i++) {

    }

    //Poner el Timeout y hacerlo tal cual como el editar
    /*
    atributosTotales = datos.length;

    var ms = 400;

    //Aqui poner el ciclo con el timeOut para que efectivamente se realice la actualizacion
    for (var i = 0; i<datos.length; i++) {
        console.log("Atributos totales: " + atributosTotales);
        console.log("Atributos exitosos: " + atributosExitosos + " -- Atributos fallidos: " + atributosFallidos);

        setTimeout(evaluarClinica({id: marker.id,
            atributo: datos[i].atributo,
            valor: datos[i].valor}),ms);

        ms += 100;
    }

    setTimeout(function() {
            if ((updatesExitosos + updatesFallidos) == updatesTotales) {
                if (updatesExitosos == updatesTotales) {
                    alert("Insercion exitosa");
                    $("#Loading").hide();
                    console.log("Re-cargar pagina");
                    sparqlReadClinic(marker.id);
                }
                else {
                    alert("Insercion parcialmente exitosa");
                    $("#Loading").hide();
                }

                updatesExitosos = 0;
                updatesFallidos = 0;
                updatesTotales = 0;
            }
        }
        ,900);

    console.log("FINALIZO EL WHILE - Atributos Exitosos: " + atributosExitosos + " -- Atributos Fallidos: " + atributosFallidos);
*/
}

function toggleBounce() {
    if (marker.getAnimation() != null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.DROP);
    }
}

function obtenerNombre(element) {
    if (!element.value) {
        nombreClinica = null;
    }
    else {
        nombreClinica = element.value;
        verificarVisibilidad();
    }
}

function obtenerCoordenadas(valor) {

    var geocoder = new google.maps.Geocoder();

    mapa = null;
    marker = null;

    geocoder.geocode( { 'address': valor}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            console.log("Latitude: " + latitude + " and longitude: " + longitude);

            //Hacemos la imagen invisible
            document.getElementById("imagenLogo").style.display = "none";

            //Mostramos el mapa
            document.getElementById("mapC").style.width = "670px";
            document.getElementById("mapC").style.height = "645px";
            document.getElementById("mapC").style.float = "left";
            document.getElementById("mapC").style.marginRight = "25px";

            mapa = new google.maps.Map(document.getElementById('mapC'), {
                zoom: 18,
                center: {lat:latitude, lng: longitude},
                mapTypeControl: false,
                zoomControl: true,
                zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER
            },
                scaleControl: true,
                streetViewControl: false
            });

            google.maps.event.addListener(mapa, 'click', function(event) {
                placeMarker(event.latLng);
            });

            function placeMarker(location) {

                 if (marker == undefined) {
                     marker = new google.maps.Marker({
                         position: location,
                         map: mapa,
                         animation: google.maps.Animation.DROP
                     });
                 }
                 else {
                    marker.setPosition(location);
                 }

                toggleBounce();
                mapa.panTo(location);
            }

            marker = new google.maps.Marker({
                map: mapa,
                position: {lat:latitude, lng: longitude},
                animation: google.maps.Animation.DROP
            });

            google.maps.event.addDomListener(window, "resize", function() {
                var center = mapa.getCenter();
                google.maps.event.trigger(mapa, "resize");
                mapa.setCenter(center);
            });

            verificarVisibilidad();
        }
    });
}