const BD = require('../dbconfig');

async function guest(req, res) {
    sql = "Select d.Nombre, p.Nombre, p.salario, p.imagen, d.DepaID, p.PuestoID From Depa_Puesto dp Inner Join Departamento d ON d.DepaID = dp.DepartamentoID Inner Join Puesto p ON p.PuestoID = dp.PuestoID ";
    let result = await BD.Open(sql, [], false);
    Puestos = [];
    for(const user of result.rows){
        var Depar = user[0];
        var puesto =  user[1];
        
        sql = "Select c.Nombre From Puesto_Cate pc Inner Join Puesto p ON p.PuestoID = pc.PuestoID AND p.Nombre = :puesto Inner Join Categoria c On C.CategoriaID = pc.CategoriaID";
        var result2 = await BD.Open(sql, [puesto], false);

        categorias = [];
        for(const categoria of result2.rows){
            let shema = {
                "nombre" : categoria[0]
            }
            categorias.push(shema);
        }

        let userSchema = {
            "Departamento": Depar,
            "Puesto": puesto,
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

module.exports = guest;