/**
 * Created by Aurelio on 2017/01/26.
 */

//$.getScript("http://lodcu.cs.chubu.ac.jp/SparqlEPCU/RDFmgr/rdfmgr-2.0.0.js");

$.getScript("http://lodcu.cs.chubu.ac.jp/SparqlEPCU/RDFmgr/rdfmgr-2.0.0.js", function() {
});

var rdfmgr;
var projectURL = "http://lodcu.cs.chubu.ac.jp/SparqlEPCU/project.jsp?projectID=APT";
var projectID = "APT";
var clinicasB;
var idClinica;

function sparqlRead(query){

    rdfmgr = new RDFmgr("APT");

    //rdfmgr.setURL("http://lodcu.cs.chubu.ac.jp/SparqlEPCU/project.jsp?projectID=APT");

    //executeSparql()でSPARQL検索を行う

    if ((query==null) || (query=="")) { //Cargar todas las clinicas
        query = "select * where{?s ?p ?o}";
    }

    rdfmgr.executeSparql( {
        sparql: query,
        inference: false,
        projectID:projectID,
        success: maketable,
        error: getErrorMsg
    });
}

function sparqlReadClinic(id){

    rdfmgr = new RDFmgr("APT");
    var projectID = "APT";
    var query = "select * where{<http://linkdata.org/resource/rdf1s4853i#" + id + "> ?p ?o}";
    idClinica = id;

    rdfmgr.executeSparql( {
        sparql: query,
        inference: false,
        projectID:projectID,
        success: recargarClinica,
        error: getErrorMsg
    });
}

function updateInstance(voto){

    var sujeto, predicado, objeto;
    rdfmgr = new RDFmgr("APT");

    sujeto = "http://linkdata.org/resource/rdf1s4853i#" + voto.id;
    predicado = "http://linkdata.org/property/rdf1s4853i#" + voto.atributo;
    objeto = voto.valor;

    setTimeout(
        rdfmgr.updateInstance({
            success:sumarUpdate(1),
            projectID:"APT",
            //error:sumarUpdate(-1),
            error:getErrorMsg,
            subject: sujeto,
            predicate: predicado,
            object: objeto
        })
    , 300);

}

function recargarClinica(re) {
    var clinica, lat, long;

    var image = {
        url: 'res/icon/health_icon.png',
        scaledSize : new google.maps.Size(35, 49)
    };

    clinica = {
            id: idClinica,
            type: "health",
            icon: image
    };

    //Aqui generamos los objetos particulares con cada uno de sus atributos
    while(re.next()) {

        var atributo, valor;
        var hayElemento = false;

        for(var i=0; i < re.getLength();i++) {

            var elementos = re.getValue(i).split("#");

            //Armamos el objeto
            if (elementos.length > 1) { //Es alguno de los atributos
                switch (elementos[1]) {
                    case "name" : //Nombre
                        hayElemento = true;
                        atributo = elementos[1];
                        break;
                    case "address": //Direccion
                        hayElemento = true;
                        atributo = elementos[1];
                        break;
                    case "doctorSpeaksEnglishTrue":
                        hayElemento = true;
                        atributo = elementos[1];
                        break;
                    case "doctorSpeaksEnglishFalse":
                        hayElemento = true;
                        atributo = elementos[1];
                        break;
                    case "doctorSpeaksChineseTrue":
                        hayElemento = true;
                        atributo = elementos[1];
                        break;
                    case "doctorSpeaksChineseFalse":
                        hayElemento = true;
                        atributo = elementos[1];
                        break;
                    case "doctorSpeaksKoreanTrue":
                        hayElemento = true;
                        atributo = elementos[1];
                        break;
                    case "doctorSpeaksKoreanFalse":
                        hayElemento = true;
                        atributo = elementos[1];
                        break;
                    case "doctorSpeaksSpanishTrue":
                        hayElemento = true;
                        atributo = elementos[1];
                        break;
                    case "doctorSpeaksSpanishFalse":
                        hayElemento = true;
                        atributo = elementos[1];
                        break;
                    case "doctorSpeaksOtherTrue":
                        hayElemento = true;
                        atributo = elementos[1];
                        break;
                    case "doctorSpeaksOtherFalse":
                        hayElemento = true;
                        atributo = elementos[1];
                        break;
                    case "staffSpeaksEnglishTrue":
                        hayElemento = true;
                        atributo = elementos[1];
                        break;
                    case "staffSpeaksEnglishFalse":
                        hayElemento = true;
                        atributo = elementos[1];
                        break;
                    case "staffSpeaksChineseTrue":
                        hayElemento = true;
                        atributo = elementos[1];
                        break;
                    case "staffSpeaksChineseFalse":
                        hayElemento = true;
                        atributo = elementos[1];
                        break;
                    case "staffSpeaksKoreanTrue":
                        hayElemento = true;
                        atributo = elementos[1];
                        break;
                    case "staffSpeaksKoreanFalse":
                        hayElemento = true;
                        atributo = elementos[1];
                        break;
                    case "staffSpeaksSpanishTrue":
                        hayElemento = true;
                        atributo = elementos[1];
                        break;
                    case "staffSpeaksSpanishFalse":
                        hayElemento = true;
                        atributo = elementos[1];
                        break;
                    case "staffSpeaksOtherTrue":
                        hayElemento = true;
                        atributo = elementos[1];
                        break;
                    case "staffSpeaksOtherFalse":
                        hayElemento = true;
                        atributo = elementos[1];
                        break;
                    case "FriendlyL1":
                        hayElemento = true;
                        atributo = elementos[1];
                        break;
                    case "FriendlyL2":
                        hayElemento = true;
                        atributo = elementos[1];
                        break;
                    case "FriendlyL3":
                        hayElemento = true;
                        atributo = elementos[1];
                        break;
                    case "ForeignLanguageTreatmentExplanationTrue":
                        hayElemento = true;
                        atributo = elementos[1];
                        break;
                    case "ForeignLanguageTreatmentExplanationFalse":
                        hayElemento = true;
                        atributo = elementos[1];
                        break;
                    default:
                        break;
                }
            }
            else { //Es algunas de las coordenadas probablemente, o el valor como tal

                if (atributo == "lat") {
                    lat = elementos[0];
                    atributo = null;
                }
                else if (atributo == "long"){
                    long = elementos[0];
                    atributo = null;
                }
                else if (elementos[0] == "geo:lat")  {
                    atributo = "lat";
                }
                else if (elementos[0] =="geo:long") {
                    atributo = "long";
                }

                valor = elementos[0]; //Guardamos el valor
            }
        }

        //Ya aqui hay un atributo listo
        if (hayElemento){
            clinica[atributo] = valor; //Agregamos el valor a la clinica
        }

        if ((lat != null) && (long != null)) { //Guardamos el elemento de posicion
            clinica["position"] = new google.maps.LatLng(lat, long);
            lat = null;
            long = null;
            atributo = null;
        }
    }

    //Aqui ya tenemos la clinica, guardarla
    var x = markerASimple(clinica);
    localStorage.setItem('clinica',JSON.stringify(x));

    //Ahora recargamos
    recargarPaginaUpdate();
}

function maketable(re){
    var clinicas = [];
    var lat, long;

    //Aqui generamos los objetos particulares con cada uno de sus atributos
    while(re.next()) {

        var clinica, atributo, valor, id;
        var hayElemento = false;

        for(var i=0; i < re.getLength();i++) {

            var elementos = re.getValue(i).split("#");

            //Armamos el objeto
            if (i == 0) { //Sujeto
                if ( (elementos.length > 1) ) {

                    if (id == null) { // Es el primer elemento, guardamos el id
                        id = elementos[1];
                    }
                    else if ((elementos[1] != id) && (!isNaN(elementos[1]))) { //No es el mismo ID y es un numero
                        //Es nueva clinica, guardamos la anterior y creamos una nueva clinica
                        clinicas.push(clinica);
                        clinica = null;
                        atributo = null;
                        id = elementos[1];
                    }
                }
            }
            else {
                if (elementos.length > 1) { //Es alguno de los atributos
                    switch (elementos[1]) {
                        case "name" : //Nombre
                            hayElemento = true;
                            atributo = elementos[1];
                            break;
                        case "address": //Direccion
                            hayElemento = true;
                            atributo = elementos[1];
                            break;
                        case "doctorSpeaksEnglishTrue":
                            hayElemento = true;
                            atributo = elementos[1];
                            break;
                        case "doctorSpeaksEnglishFalse":
                            hayElemento = true;
                            atributo = elementos[1];
                            break;
                        case "doctorSpeaksChineseTrue":
                            hayElemento = true;
                            atributo = elementos[1];
                            break;
                        case "doctorSpeaksChineseFalse":
                            hayElemento = true;
                            atributo = elementos[1];
                            break;
                        case "doctorSpeaksKoreanTrue":
                            hayElemento = true;
                            atributo = elementos[1];
                            break;
                        case "doctorSpeaksKoreanFalse":
                            hayElemento = true;
                            atributo = elementos[1];
                            break;
                        case "doctorSpeaksSpanishTrue":
                            hayElemento = true;
                            atributo = elementos[1];
                            break;
                        case "doctorSpeaksSpanishFalse":
                            hayElemento = true;
                            atributo = elementos[1];
                            break;
                        case "doctorSpeaksOtherTrue":
                            hayElemento = true;
                            atributo = elementos[1];
                            break;
                        case "doctorSpeaksOtherFalse":
                            hayElemento = true;
                            atributo = elementos[1];
                            break;
                        case "staffSpeaksEnglishTrue":
                            hayElemento = true;
                            atributo = elementos[1];
                            break;
                        case "staffSpeaksEnglishFalse":
                            hayElemento = true;
                            atributo = elementos[1];
                            break;
                        case "staffSpeaksChineseTrue":
                            hayElemento = true;
                            atributo = elementos[1];
                            break;
                        case "staffSpeaksChineseFalse":
                            hayElemento = true;
                            atributo = elementos[1];
                            break;
                        case "staffSpeaksKoreanTrue":
                            hayElemento = true;
                            atributo = elementos[1];
                            break;
                        case "staffSpeaksKoreanFalse":
                            hayElemento = true;
                            atributo = elementos[1];
                            break;
                        case "staffSpeaksSpanishTrue":
                            hayElemento = true;
                            atributo = elementos[1];
                            break;
                        case "staffSpeaksSpanishFalse":
                            hayElemento = true;
                            atributo = elementos[1];
                            break;
                        case "staffSpeaksOtherTrue":
                            hayElemento = true;
                            atributo = elementos[1];
                            break;
                        case "staffSpeaksOtherFalse":
                            hayElemento = true;
                            atributo = elementos[1];
                            break;
                        case "FriendlyL1":
                            hayElemento = true;
                            atributo = elementos[1];
                            break;
                        case "FriendlyL2":
                            hayElemento = true;
                            atributo = elementos[1];
                            break;
                        case "FriendlyL3":
                            hayElemento = true;
                            atributo = elementos[1];
                            break;
                        case "ForeignLanguageTreatmentExplanationTrue":
                            hayElemento = true;
                            atributo = elementos[1];
                            break;
                        case "ForeignLanguageTreatmentExplanationFalse":
                            hayElemento = true;
                            atributo = elementos[1];
                            break;
                        default:
                            break;
                    }
                }
                else { //Es algunas de las coordenadas probablemente, o el valor como tal

                    if (clinica == null) { //Inicializamos la clinica
                        clinica = {
                            id: id,
                            type: "health"
                        };
                    }

                    if (atributo == "lat") {
                        lat = elementos[0];
                        atributo = null;
                    }
                    else if (atributo == "long"){
                        long = elementos[0];
                        atributo = null;
                    }
                    else if (elementos[0] == "geo:lat")  {
                        atributo = "lat";
                    }
                    else if (elementos[0] =="geo:long") {
                        atributo = "long";
                    }

                    valor = elementos[0]; //Guardamos el valor
                }
            }
        }

        //Ya aqui hay un atributo listo
        if (hayElemento){
            clinica[atributo] = valor; //Agregamos el valor a la clinica
        }

        if ((lat != null) && (long != null)) { //Guardamos el elemento de posicion
            clinica["position"] = new google.maps.LatLng(lat, long);
            lat = null;
            long = null;
            atributo = null;
        }

    }

    if (hayElemento) {//Verificamos el ultimo elemento
        clinicas.push(clinica);
    }

    //terminoCreacionObjeto(clinicas);
    cargarClinicasRDF(clinicas);
}

function getErrorMsg(eType,eMsg,eInfo){
    alert(eMsg+"\n\n"+eInfo);
}

function markerASimple(marker) {
    var ret = {
        id: marker.id,
        description: marker.address,
        position: marker.position,
        title: marker.name,
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