const BD = require('../dbconfig');
var fs = require('fs');
var parser = require('xml2json');


async function carga(req, res) {
    fs.readFile( './entrada.xml', function(err, data) {
        var jsons = JSON.parse(parser.toJson(data, {reversible: true}));
        var departamentos = jsons["departamentos"]["departamento"];

        for (var i = 0; i < departamentos.length; i++) {
            var departamento = departamentos[i];
            console.log(departamento["nombre"]["$t"] + ";");
            console.log(departamento["capital_total"]["$t"] + ";");
            
            var puestos = departamento["puestos"]["puesto"];
            for(var j = 0; j < puestos.length; j++){
                var puesto = puestos[j];
                console.log(puesto["nombre"]["$t"] + "-");
                console.log(puesto["salario"]["$t"] + "-");
                
                var categorias = puesto["categorias"]["categoria"]
                for(var z = 0; z < categorias.length; z++){
                    var categoria = categorias[z];
                    console.log(categoria["nombre"]["$t"] + "^");
                }

                var requisitos = puesto["requisitos"]["requisito"]
                for(var w = 0; w < requisitos.length; w++){
                    var requisito = requisitos[w];
                    console.log(requisito["nombre"]["$t"] + "*");
                    console.log(requisito["tamaño"]["$t"] + "*");
                    console.log(requisito["obligatorio"]["$t"] + "*");

                    var formatos = requisito["formatos"]["formato"];
                    for(var k = 0; k < requisito.length; k++){
                        var formato = formatos[k];
                        console.log(formato["nombre"]["$t"] + "+");
                    }
                }
            }
        }
        res.json(jsons)
    });
}

module.exports = carga;