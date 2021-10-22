const BD = require('../../dbconfig');

async function user(req, res) {
    var {usuario, estado, inicio, final, rol} = req.body;
    console.log(req.body);
    if(usuario != null) usuario = `'${usuario}'`;
    if(estado != null) estado = `'${estado}'`;
    if(inicio != null) inicio = `'${inicio}'`;
    if(final != null) final = `'${final}'`;
    if(rol != null) rol = `'${rol}'`;

    sql = `Select PersonalID, Usuario, Contraseña, Estado, TO_CHAR(Fecha_Inicio, 'DD/MM/YYYY' ) Fecha_Inicio, TO_CHAR(Fecha_Fin, 'DD/MM/YYYY' ) Fecha_Fin, r.Nombre, d.Nombre, Correo From Personal p Inner Join Rol r ON r.RolID = p.RolID Inner Join Departamento d ON d.DepaID = p.DepartamentoID ` + 
    `WHERE (p.Usuario = ${usuario} OR ${usuario} is null) AND (p.Estado = ${estado} OR ${estado} is null) AND (p.Fecha_Inicio = TO_DATE(${inicio}, 'YYYY-MM-DD') OR ${inicio} is null) AND (p.Fecha_Fin = TO_DATE(${final}, 'YYYY-MM-DD') OR ${final} is null) AND (r.Nombre = ${rol} OR ${rol} is null)`;
    let result = await BD.Open(sql, [], false);
    Users = [];
    result.rows.map(user => {
        let userSchema = {
            "id": user[0],
            "user": user[1],
            "pass": user[2],
            "estado": user[3],
            "inicio": user[4],
            "fin": user[5],
            "rol": user[6],
            "depa": user[7],
            "correo": user[8]
        }
        Users.push(userSchema);
    })
    res.json(Users);
}

module.exports = user;