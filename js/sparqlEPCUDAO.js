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
    var str = new String("<tr>");

    for(var i=0; i<re.getKeyListLength();i++){
        str += "<td>"+re.getKey(i)+"</td>";
    }
    str += "</tr>";

    //Aqui generamos los objetos particulares con cada uno de sus atributos
    while(re.next()){
        for(var i=0; i < re.getLength();i++){
            str += "<td><pre>"+re.getValue(i)+"</pre></td>";
        }
        str += "</tr>";
    }

    //$("#disp").append(str);
    var a = 0;
}

function getErrorMsg(eType,eMsg,eInfo){
    alert(eMsg+"\n\n"+eInfo);
}