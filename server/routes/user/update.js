const BD = require('../../dbconfig');

async function insert(req, res) {
    const { id, user, pass, rol, depa} = req.body;

    sql = "Select Count(*) FROM Personal p Inner Join Departamento d ON d.DepaID = p.DepartamentoID AND d.Nombre = :depa Inner Join Rol r On r.RolID = p.RolID AND r.Nombre = 'Coordinador'"
    var result = await BD.Open(sql, [depa], false); 
    if(result.rows[0][0] == 1){
        res.json({"msg": "Ya existe un coordinador en el departamento"})
    }

    sql = "Update Personal Set Usuario = :user, Contraseña = :pass, RolID = (Select RolID From Rol WHERE Nombre = :rol), DepartamentoID = (Select DepaID From Departamento WHERE Nombre = :depa) WHERE PersonalID = :id"
    await BD.Open(sql, [id, user, pass, rol, depa], true);
    res.json({"msg": "Usuario editado correctamente"});
}

module.exports = insert;