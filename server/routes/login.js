const BD = require('../dbconfig');

async function login(req, res) {
    console.log(req.body)
    const { usuario, pass} = req.body;
    sql = "Select r.Nombre, l.AplicanteCUI From login l Inner Join Rol r ON l.RolID = r.RolID Where l.Usuario = :usuario AND l.Contrasenia = :pass";
    let result = await BD.Open(sql, [usuario, pass], false);
    if(result.rows[0] == null){
        sql = "Select r.Nombre, p.PersonalID From Personal p Inner Join Rol r ON r.RolID = p.RolID Where Usuario = :usuario AND Contraseña = :pass AND Estado = '1'"
        result = await BD.Open(sql, [usuario, pass], false)
    }
    let userSchema = {};
    for (const user of result.rows){
        userSchema  = {
            "Rol" : user[0],
            "id" : user[1]
        }
    }
    console.log(userSchema)
    res.send(userSchema);
}

module.exports = login;