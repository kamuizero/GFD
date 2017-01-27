/**
 * Created by Aurelio on 2017/01/26.
 */

$.getScript("http://lodcu.cs.chubu.ac.jp/SparqlEPCU/RDFmgr/rdfmgr-2.0.0.js", function() {
    alert("Script loaded but not necessarily executed.");
});

var rdfmgr = new RDFmgr();
var projectURL = "http://lodcu.cs.chubu.ac.jp/SparqlEPCU/project.jsp?projectID=APT";
var projectID = "APT";

function sparqlRead(query){
    var stext = $("#sparql").val();

    rdfmgr = new RDFmgr("APT");

    //rdfmgr.setURL("http://lodcu.cs.chubu.ac.jp/SparqlEPCU/project.jsp?projectID=APT");

    //executeSparql()でSPARQL検索を行う

    if ((query==null) || (query=="")) {
        query = "select * where{?s ?p ?o}";
    }

    rdfmgr.executeSparql({
        sparql: query,
        inference: false,
        projectID:projectID,
        success: maketable,
        error: getErrorMsg
    });
}

function updateInstance(){

    var sujeto, predicado, objeto;

    //sujeto debe ser el ID de la clinica
    //predicado = el atributo que vamos a incrementar o valorar.
    //objeto = objeto + 1;

    rdfmgr.updateInstance({
        success:alert('Registro actualizado'),
        projectID:"APT",
        error:getErrorMsg,
        subject: $("#sub").val(),
        predicate: $("#pre").val(),
        object: $("#obj").val()
    });
}

//SparqlEPCUから受け取ったJSONデータをイテレータを使用して取り出し表作成
function maketable(re){
    //$("#disp").empty();
    var clinicas = [];
    var lat, long;

    var str = new String("<tr>");

    for(var i=0; i<re.getKeyListLength();i++){
        str += "<td>"+re.getKey(i)+"</td>";
    }
    str += "</tr>";


    //Aqui generamos los objetos particulares con cada uno de sus atributos
    while(re.next()) {

        var clinica, atributo, valor, id;
        var hayElemento = false;

        for(var i=0; i < re.getLength();i++) {
            str += "<td><pre>"+re.getValue(i)+"</pre></td>";

            var elementos = re.getValue(i).split("#");

            //Armamos el objeto
            if (i == 0) { //Sujeto
                if (elementos.length > 1) {
                    if (id == null) { // Es el primer elemento, guardamos el id
                        id = elementos[1];
                    }
                    else if ((elementos[1] != id) && (!isNaN(elementos[1]))) { //No es el mismo ID y es un numero
                        //Es nueva clinica, guardamos la anterior y creamos una nueva clinica
                        clinicas.push(clinica);
                        clinica = null;
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
                    if (clinica == null) {
                        clinica = {
                            id: id
                        };
                    }
                    else if (elementos[0] == "geo:lat") {
                        atributo = "lat";
                    }
                    else if (atributo == "lat") {
                        lat = elementos[0];
                    }
                    else if (elementos[0] =="geo:long") {
                        atributo = "long";
                    }
                    else if (atributo == "long"){
                        long = elementos[0];
                    }
                    valor = elementos[0]; //Guardamos el valor
                }
            }
        }
        str += "</tr>";

        //Ya aqui hay un atributo listo
        if (hayElemento){
            clinica[atributo] = valor; //Agregamos el valor a la clinica
        }

        if ((lat != null) && (long != null)) { //Guardamos el elemento de posicion
            clinica["position"] = new google.maps.LatLng(lat, long);
            lat = null;
            long = null;
        }

    }

    //$("#disp").append(str);
    var a = 0;
}

function getErrorMsg(eType,eMsg,eInfo){
    alert(eMsg+"\n\n"+eInfo);
}