const BD = require('../../dbconfig');
const fs = require('fs');
const { graphviz } = require('node-graphviz');
var contador;

async function report(req, res) {
    console.log(req.body)
    const { depa } = req.body;
    var response;
    contador = 0;
    response = `
    digraph G {
        fixedwidth = true;
      
        node [
          shape="box",
          style="rounded",
          penwidth = 1,
          width=2.0,
          fontname = "Arial",
          fontsize = 12
          color = "dodgerblue4"
        ];
      
        edge [
          color="#142b30",
          arrowhead="vee",
          arrowsize=0.75,
          penwidth = 2,
          weight=1.0
        ];
    `
    response += "\n"
    if(depa === "INSTITUCION COMPLETA"){
        response += await allDep();
    }
    else{
        response += await Dep(depa);
    }
    response += "\n"
    response += "}"
    console.log(response);
    var fileLocation = `upload/report1.svg`
    await graphviz.dot(response, 'svg').then((svg) => {
        fs.writeFileSync(fileLocation, svg);
    });
    file = 'report1.svg'
    res.download(fileLocation, file, (err) => {
            if (err) console.log(err);
    });
}

async function allDep() {
    var response = "";
    sql = "Select d.Nombre, d.CapitalTotal, d.DepaID From Departamento d";
    let result = await BD.Open(sql, [], false);
    for(const dep of result.rows){
        contador++;
        response += `A${contador} [ label = <
            <TABLE BORDER="0" CELLSPACING="5">
              <TR>
                 <TD><FONT POINT-SIZE="18"><b>Departamento</b></FONT></TD>
                
              </TR>
              <TR>
               <TD><FONT POINT-SIZE="16">${dep[0]}<BR/>${dep[1]}</FONT></TD>
              </TR>
            </TABLE>>
        ];`
        response += "\n"
        response += await puesto(dep[2], contador);
        response += "\n"
    }
    return response;
}

async function Dep(depa) {
    var response = "";
    sql = "Select d.Nombre, d.CapitalTotal, d.DepaID From Departamento d WHERE d.Nombre = :depa";
    let result = await BD.Open(sql, [depa], false);
    contador++;
    response += `A${contador} [ label = <
        <TABLE BORDER="0" CELLSPACING="5">
          <TR>
             <TD><FONT POINT-SIZE="18"><b>Departamento</b></FONT></TD>
            
          </TR>
          <TR>
           <TD><FONT POINT-SIZE="16">${result.rows[0][0]}<BR/>${result.rows[0][1]}</FONT></TD>
          </TR>
        </TABLE>>
    ];`
    response += "\n"
    response += await puesto(result.rows[0][2], contador);
    return response;
}


async function puesto(depa, edge) {
    var response = "";
    sql = "Select p.Nombre, p.Salario, p.PuestoID FROM Puesto p INNER JOIN Depa_Puesto dp ON dp.PuestoID = p.PuestoID AND dp.DepartamentoID = :depa"
    let result = await BD.Open(sql, [depa], false);
    contador++;
    for(const puesto of result.rows){
        response += `B${contador} [ label = <
            <TABLE BORDER="0" CELLSPACING="5">
              <TR>
                <TD><FONT POINT-SIZE="14"><b>Puesto</b></FONT></TD>
              </TR>
              <TR>
                <TD><FONT POINT-SIZE="12">${puesto[0]}<BR/>${puesto[1]}</FONT></TD>
              </TR>
            </TABLE>>
        ];`
        response += "\n"
        response += `A${edge} -> B${contador}:n;`
        response += "\n"
        response += await Categorias(puesto[2], contador);
        response += "\n"
        
    }
    return response;
}

async function Categorias(puesto, edge) {
    var response = "";
    sql = "SELECT c.Nombre FROM Categoria c INNER Join Puesto_Cate pc ON pc.CategoriaID = c.CategoriaID AND pc.PuestoID = :puesto"
    let result = await BD.Open(sql, [puesto], false);
    contador++;
    response += `C${contador} [ label = <
    <TABLE BORDER="0" CELLPADDING="0" ALIGN="LEFT">
    <TR>
    <TD ALIGN="LEFT"><FONT POINT-SIZE="12"><b>Categorias</b></FONT></TD>
    </TR>`
    response += "\n"
    for(const categoria of result.rows){
        response += `<TR>
        <TD ALIGN="LEFT"><FONT POINT-SIZE="10"><b>- </b>${categoria[0]}</FONT></TD>
        </TR>`
        response += "\n"
    }      
    response += `</TABLE>>
    ];`
    response += "\n"
    response += `B${edge} -> C${contador}:n;`
    response += "\n"
    response += await Requisitos(puesto, edge);
    response += "\n"
    return response;
}

async function Requisitos(puesto, edge){
    var response = "";
    sql = "SELECT r.Nombre, r.RequisitoID FROM Requisito r INNER Join Puesto_Requisito pr ON pr.RequisitoID = r.RequisitoID AND pr.PuestoID = :puesto"
    let result = await BD.Open(sql, [puesto], false);
    for(const requisito of result.rows){
        contador++;
        response += ` D${contador} [ label = <
            <TABLE BORDER="0" CELLPADDING="0" ALIGN="LEFT">
              <TR>
                <TD ALIGN="LEFT"><FONT POINT-SIZE="12"><b>Requisito</b></FONT></TD>
              </TR>
              <TR>
                <TD ALIGN="LEFT"><FONT POINT-SIZE="10">${requisito[0]}</FONT></TD>
              </TR>
            </TABLE>>
        ];`
        response += "\n"
        response += `B${edge} -> D${contador}:n;`
        response += "\n"
        response += await Formatos(requisito[1], contador);
        response += "\n"
    }
    return response;
}

async function Formatos(requisito, edge) {
    var response = "";
    sql = " SELECT f.Nombre FROM Formato f INNER Join Requisito_Formato rf ON rf.FormatoID = f.FormatoID AND rf.RequisitoID = :requisito"
    let result = await BD.Open(sql, [requisito], false);
    contador++;
    response += `E${contador} [ label = <
        <TABLE BORDER="0" CELLPADDING="0" ALIGN="LEFT">
        <TR>
        <TD ALIGN="LEFT"><FONT POINT-SIZE="8"><b>Formatos</b></FONT></TD>
        </TR>`
    for(const formato of result.rows){
        response += ` <TR>
            <TD ALIGN="LEFT"><FONT POINT-SIZE="6"><b>- </b>${formato[0]}</FONT></TD>
            </TR>`
    }
    response +=  `</TABLE>>
    ];`
    response += "\n";
    response += `D${edge} -> E${contador}:n;`
    response += "\n"
    return response;
}

module.exports = report;