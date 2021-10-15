const BD = require('../dbconfig');

async function login(req, res) {
    sql = "Select Usuario, Contrasenia, Nombre From login l, Rol r WHere l.RolID = r.RolID";

    let result = await BD.Open(sql, [], false);
    console.log(result.rows)
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "Usuario": user[0],
            "Contaseña": user[1],
            "Rol": user[2]
        }
        Users.push(userSchema);
    })

    res.json(Users);
}

module.exports = login;