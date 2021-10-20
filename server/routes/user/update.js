const BD = require('../../dbconfig');

async function insert(req, res) {
    const { idP, usuario, pass, correo, rol, depa} = req.body;
    console.log(req.body);
    sql = "Select p.PersonalID, Count(*) FROM Personal p Inner Join Departamento d ON d.DepaID = p.DepartamentoID AND d.Nombre = :depa Inner Join Rol r On r.RolID = p.RolID AND r.Nombre = 'Coordinador' WHERE Estado = '1' GROUP BY p.PersonalID"
    var result = await BD.Open(sql, [depa], false); 
    if(result.rows[0][1] == 1 && rol == 'Coordinador' && result.rows[0][0] != idP){
       res.send({"msg": "Ya existe un coordinador en el departamento"});
       return;
    }
    console.log(idP);
    sql = `Update Personal Set Usuario = '${usuario}', Contraseña = '${pass}', Correo = '${correo}', RolID = (Select RolID From Rol WHERE Nombre = '${rol}'), DepartamentoID = (Select DepaID From Departamento WHERE Nombre = '${depa}') WHERE PersonalID = ${idP}`;
    await BD.Open(sql, [], true);
    res.json({"msg": "Usuario editado correctamente"});
}

module.exports = insert;