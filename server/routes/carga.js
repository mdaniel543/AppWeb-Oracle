const BD = require('../dbconfig');
var fs = require('fs');
var parser = require('xml2json');
const e = require('cors');


async function carga(req, res) {
    fs.readFile( './entrada.xml', function(err, data) {
        var jsons = JSON.parse(parser.toJson(data, {reversible: true}));
        var departamentos = jsons["departamentos"]["departamento"];
        for (var i = 0; i < departamentos.length; i++) {
            var departamento = departamentos[i];
            console.log(departamento["nombre"]["$t"] + ";");
            console.log(departamento["capital_total"]["$t"] + ";");
            val(departamento);
        }
        res.json(jsons)
    });
}

async function val(departamento) {
    if(departamento["puestos"] != undefined){
        puest(departamento)
    }
    if(departamento["departamentos"] != undefined){
        moreDep(departamento)
    }
}

async function moreDep(departamento) {
    var masdepa = departamento["departamentos"]["departamento"];
    var aux = false;
    if(masdepa.length == undefined){
        masdepa.length = 1;
        aux = true;
    }
    for(var t = 0; t < masdepa.length; t++){
        var depa
        if(aux)  {
            depa = masdepa
        }else{
            depa = masdepa[t];
        }    
        console.log(depa["nombre"]["$t"]);
        console.log(depa["capital_total"]["$t"]);
        val(depa);
    }
}

async function puest(departamento) {
    var puestos = departamento["puestos"]["puesto"];
    var aux = false;
    if(puestos.length == undefined){
        puestos.length = 1;
        aux = true;
    }
    for(var j = 0; j < puestos.length; j++){
        var puesto
        if(aux)  {
            puesto = puestos
        }else{
            puesto = puestos[j];
        } 
        console.log(puesto["nombre"]["$t"] + "-");
        console.log(puesto["salario"]["$t"] + "-");
        if (puesto["imagen"] != undefined){
            console.log(puesto["imagen"]["$t"] + "-");
        }
        if(puesto["categorias"] != undefined){
            catego(puesto);
        }
        if(puesto["requisitos"] != undefined){
            requi(puesto);
        }
    }
}

async function catego(puesto) {
    var categorias = puesto["categorias"]["categoria"];
    var aux = false;
    if(categorias.length == undefined){
        categorias.length = 1;
        aux = true;
    }
    for(var z = 0; z < categorias.length; z++){
        var categoria
        if(aux){
            categoria = categorias;
        }else{
            categoria = categorias[z];
        }
        console.log(categoria["nombre"]["$t"] + "^");
    }
}

async function requi(puesto) {
    var requisitos = puesto["requisitos"]["requisito"];
    var aux = false;
    if(requisitos.length == undefined){
        requisitos.length = 1;
        aux = true;
    }
    for(var w = 0; w < requisitos.length; w++){
        var requisito;
        if(aux){
            requisito = requisitos;
        }else{
            requisito = requisitos[w]
        }
        console.log(requisito["nombre"]["$t"] + "*");
        console.log(requisito["tamaño"]["$t"] + "*");
        console.log(requisito["obligatorio"]["$t"] + "*");
        if(requisito["formatos"] != undefined){
            format(requisito)
        }
    }
}

async function format(requisito) {
    var formatos = requisito["formatos"]["formato"]
    var aux = false;
    if(formatos.length == undefined){
        aux = true;
        formatos.length = 1;
    }
    for(var k = 0; k < formatos.length; k++){
        var formato;
        if(aux){
            formato = formatos;
        }
        else{
            formato = formatos[k];
        }
        console.log(formato["nombre"]["$t"] + "+");
    }
}

module.exports = carga;