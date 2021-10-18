const BD = require('../../dbconfig');

async function insertU(req, res) {
    console.log(req.body)
    const { usuario, pass, inicio, rol, depa} = req.body;
    console.log(rol)
    sql = "Select Count(*) FROM Personal p Inner Join Departamento d ON d.DepaID = p.DepartamentoID AND d.Nombre = :depa Inner Join Rol r On r.RolID = p.RolID AND r.Nombre = 'Coordinador' WHERE Estado = '1'"
    var result = await BD.Open(sql, [depa], false); 
    if(result.rows[0][0] == 1 && rol == 'Coordinador'){
       res.send({"msg": "Ya existe un coordinador en el departamento"});
       return;
    }
    console.log(rol)
    sqlw = "Insert Into Personal(Usuario, Contraseña, Estado, Fecha_Inicio, RolID, DepartamentoID) Select :usuario, :pass, '1',TO_DATE(:inicio, 'YYYY/MM/DD'), RolID, DepaID FROM Rol r, Departamento d Where r.Nombre = :rol AND d.Nombre = :depa";
    await BD.Open(sqlw, [usuario, pass, inicio, rol, depa], true);
    res.send({"msg": "Usuario creado correctamente"});
}

module.exports = insertU;