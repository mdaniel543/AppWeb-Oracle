const BD = require('../dbconfig');

async function searchGuest(req, res) {
    console.log(req.body)
    var {puesto, salario, categoria, depa} = req.body;
    if(puesto != null){
        puesto = `'${puesto}'`
    }
    if(categoria != null){
        categoria = `'${categoria}'`
    }
    if(depa != null){
        depa = `'${depa}'`
    }
    sql = `Select d.Nombre, p.Nombre, p.salario, p.imagen, d.DepaID, p.PuestoID From Depa_Puesto dp Inner Join Departamento d ON d.DepaID = dp.DepartamentoID Inner Join Puesto p ON p.PuestoID = dp.PuestoID Inner Join Puesto_Cate pc ON pc.PuestoID = p.PuestoID Inner Join Categoria c ON c.CategoriaID = pc.CategoriaID ` + 
    `WHERE (p.nombre = ${puesto} OR ${puesto} is null) AND (p.Salario >= ${salario} OR ${salario} is null) AND (d.Nombre = ${depa} OR ${depa} is null) AND (c.Nombre = ${categoria} OR ${categoria} is null)  GROUP BY d.Nombre, p.Nombre, p.salario, p.imagen, d.DepaID, p.PuestoID`;
    console.log(sql)
    let result = await BD.Open(sql, [], false);
    Puestos = [];
    console.log(result.rows);
    for(const user of result.rows){
        var Depar = user[0];
        var puestoN =  user[1];
        
        sql = "Select c.Nombre From Puesto_Cate pc Inner Join Puesto p ON p.PuestoID = pc.PuestoID AND p.Nombre = :puesto Inner Join Categoria c On C.CategoriaID = pc.CategoriaID";
        var result2 = await BD.Open(sql, [puestoN], false);

        categorias = [];
        for(const categoria of result2.rows){
            let shema = {
                "nombre" : categoria[0]
            }
            categorias.push(shema);
        }

        let userSchema = {
            "Departamento": Depar,
            "Puesto": puestoN,
            "Salario": user[2],
            "Imagen" : user[3],
            "Categorias": categorias,
            "idD": user[4],
            "idP": user[5]
        }
        Puestos.push(userSchema);
    }
    res.json(Puestos);
}

module.exports = searchGuest;