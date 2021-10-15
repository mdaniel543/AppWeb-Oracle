const BD = require('../dbconfig');
var fs = require('fs');
var parser = require('xml2json');
const e = require('cors');


async function carga(req, res) {
    var data =  fs.readFileSync( './entrada.xml', 'utf8') 
    var jsons = JSON.parse(parser.toJson(data, {reversible: true}));
    var departamentos = jsons["departamentos"]["departamento"];
    for (var i = 0; i < departamentos.length; i++) {
        var departamento = departamentos[i];
        var nombre = departamento["nombre"]["$t"]; 
        var capital = departamento["capital_total"]["$t"];
        sql = "Insert Into Departamento(Nombre, CapitalTotal) Values (:nombre, :capital)";
        await BD.Open(sql, [nombre, capital], true);
        val(departamento, nombre);
    }
    res.json(jsons)
}


async function val(departamento, nombreDep) {
    if(departamento["puestos"] != undefined){
        puest(departamento, nombreDep)
    }
    if(departamento["departamentos"] != undefined){
        moreDep(departamento, nombreDep)
    }
}

async function moreDep(departamento, nombreDep) {
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
        var nombre = depa["nombre"]["$t"];
        var capital = depa["capital_total"]["$t"];
        sql = "Insert Into Departamento(Nombre, CapitalTotal, DepartamentoID) Select :nombre, :capital, DepaID From Departamento Where Nombre = :nombreDep"
        await BD.Open(sql, [nombre, capital, nombreDep], true);
        val(depa, nombre);
    }
}

async function puest(departamento, nombreDep) {
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
        var nombre = puesto["nombre"]["$t"];
        var salario = puesto["salario"]["$t"];
        if (puesto["imagen"] != undefined){
            var imagen = puesto["imagen"]["$t"];
            sql = "Insert Into Puesto(Nombre, Salario, Imagen) Select :nombre, :salario, :imagen From dual Where NOT EXISTS (Select * From Puesto Where Nombre = :nombre AND Salario = :salario)"
            await BD.Open(sql, [nombre, salario, imagen], true);
        }else{
            sql = "Insert Into Puesto(Nombre, Salario) Select :nombre, :salario From dual Where NOT EXISTS (Select * From Puesto Where Nombre = :nombre AND Salario = :salario)";
            await BD.Open(sql, [nombre, salario], true);
        }
        sql = "Insert Into Depa_Puesto(DepartamentoID, PuestoID) Select DepaID, PuestoID From Departamento d, Puesto p Where d.Nombre = :nombreDep AND p.Nombre = :nombre";
        await BD.Open(sql, [nombreDep, nombre], true);
        if(puesto["categorias"] != undefined){
            catego(puesto, nombre);
        }
        if(puesto["requisitos"] != undefined){
            requi(puesto, nombre);
        }
    }
}

async function catego(puesto, nombrePue) {
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
        var nombre = categoria["nombre"]["$t"];
        sql = "Insert Into Categoria(Nombre) Select :nombre From dual Where NOT EXISTS (Select * From Categoria WHERE Nombre = :nombre)";
        await BD.Open(sql, [nombre], true);
        sql = "Insert Into Puesto_Cate(CategoriaID, PuestoID) Select CategoriaID, PuestoID FROM Categoria c, Puesto p Where c.Nombre = :nombre AND p.Nombre = :nombrePue";
        await BD.Open(sql, [nombre, nombrePue], true);
    }
}

async function requi(puesto, nombrePue) {
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
        var nombre = requisito["nombre"]["$t"];
        var tamanio = requisito["tamaño"]["$t"];
        var obli  = requisito["obligatorio"]["$t"];
        sql = "Insert Into Requisito(Nombre, Tamanio, Obligatorio) Select :nombre, :tamanio, :obli From dual Where NOT EXISTS (Select * FROM Requisito Where Nombre = :nombre AND Tamanio = :tamanio AND Obligatorio = :obli)";
        await BD.Open(sql, [nombre, tamanio, obli], true);
        sql = "Insert Into Puesto_Requisito(RequisitoID, PuestoID) Select RequisitoID, PuestoID From Puesto p, Requisito r WHERE  p.Nombre = :nombrePue AND r.Nombre = :nombre";
        await BD.Open(sql, [nombrePue, nombre], true);
        if(requisito["formatos"] != undefined){
            format(requisito, nombre)
        }
    }
}

async function format(requisito, nombreForm) {
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
        var nombre = formato["nombre"]["$t"];
        sql = "Insert Into Formato(Nombre) Select :nombre From dual Where NOT EXISTS (Select * From Formato WHERE Nombre = :nombre)";
        await BD.Open(sql, [nombre], true);
        sql = "Insert Into Requisito_Formato(FormatoID, RequisitoID) Select FormatoID, RequisitoID From Formato f, Requisito r Where f.Nombre = :nombreForm AND r.Nombre = :nombre";
        await BD.Open(sql, [nombre, nombreForm], true);

    }
}

module.exports = carga;