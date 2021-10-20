const BD = require('../../dbconfig');

async function user(req, res) {
    sql = "Select PersonalID, Usuario, Contraseña, Estado, TO_CHAR(Fecha_Inicio, 'DD/MM/YYYY' ) Fecha_Inicio, TO_CHAR(Fecha_Fin, 'DD/MM/YYYY' ) Fecha_Fin, r.Nombre, d.Nombre, Correo From Personal p Inner Join Rol r ON r.RolID = p.RolID Inner Join Departamento d ON d.DepaID = p.DepartamentoID ";
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