const BD = require('../../dbconfig');

async function insert(req, res) {
    const { idP, usuario, pass, rol, depa} = req.body;
    console.log(req.body);
    sql = "Select Count(*) FROM Personal p Inner Join Departamento d ON d.DepaID = p.DepartamentoID AND d.Nombre = :depa Inner Join Rol r On r.RolID = p.RolID AND r.Nombre = 'Coordinador' WHERE Estado = '1'"
    var result = await BD.Open(sql, [depa], false); 
    if(result.rows[0][0] == 1 && rol == 'Coordinador'){
       res.send({"msg": "Ya existe un coordinador en el departamento"});
       return;
    }
    console.log(idP);
    sql = `Update Personal Set Usuario = '${usuario}', Contraseña = '${pass}', RolID = (Select RolID From Rol WHERE Nombre = '${rol}'), DepartamentoID = (Select DepaID From Departamento WHERE Nombre = '${depa}') WHERE PersonalID = ${idP}`;
    await BD.Open(sql, [], true);
    res.json({"msg": "Usuario editado correctamente"});
}

module.exports = insert;