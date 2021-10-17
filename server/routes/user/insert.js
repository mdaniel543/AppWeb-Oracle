const BD = require('../../dbconfig');

async function insert(req, res) {
    const { user, pass, fecha, rol, depa} = req.body;
    sql = "Select Count(*) FROM Personal p Inner Join Departamento d ON d.DepaID = p.DepartamentoID AND d.Nombre = :depa Inner Join Rol r On r.RolID = p.RolID AND r.Nombre = 'Coordinador'"
    var result = await BD.Open(sql, [depa], false); 
    if(result.rows[0][0] == 1){
        res.json({"msg": "Ya existe un coordinador en el departamento"})
    }
    sql = "Insert Into Personal(Usuario, Contraseña, Estado, Fecha_Inicio, RolID, DepartamentoID) Select :user, :pass, '1', :fecha, RolID, DepartamentoID FROM Rol r, Departamento d Where r.Nombre = :rol AND d.Nombre = :depa";
    await BD.Open(sql, [user, pass, fecha, rol, depa], true);
    res.json({"msg": "Usuario creado correctamente"});
}

module.exports = insert;