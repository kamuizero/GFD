/**
 * Created by AEPM on 2017/06/26.
 */
var query;
var grafo = "http://lod.mdg";
const endpoint = "http://127.0.0.1:8890/sparql/";

/*
 * Funcion de consulta de query normal, no asincrono
 */
function sparqlQuery(query, baseURL, format) {
    if(!format)
        format="application/json";
    var params={
        "default-graph": "", "should-sponge": "soft", "query": query,
        "debug": "on", "timeout": "", "format": format,
        "save": "display", "fname": ""
    };

    var querypart="";
    for(var k in params) {
        querypart+=k+"="+encodeURIComponent(params[k])+"&";
    }
    var queryURL=baseURL + '?' + querypart;
    if (window.XMLHttpRequest) {
        xmlhttp=new XMLHttpRequest();
    }
    else {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    //console.log("BASE URL : " + baseURL);
    //console.log("QUERY URL : " + queryURL);

    var url2 = baseURL + "?query=" +encodeURIComponent(query)+"&format="+format;

    //console.log("URL2 es: " + url2);

    //TODO: La llamada en el servidor al final debe ser mediante un proxy para evitar problemas CORS
    xmlhttp.open("GET",url2,false);
    xmlhttp.send();

    return JSON.parse(xmlhttp.responseText);
}

/*
 * Ejemplo de llamada a la clase
 */
var query="PREFIX lkd:<http://linkdata.org/property/rdf1s4853i> select * from<" + dsn + "> where { ?clinica ?atributo ?valor. } ORDER BY DESC (?clinica) LIMIT 200";

var data=sparqlQuery(query,endpoint);

console.log(data);