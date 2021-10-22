const BD = require('../dbconfig');

async function login(req, res) {
    console.log(req.body)
    const { user, pass} = req.body;
    sql = "Select r.Nombre, l.id From login l Inner Join Rol r ON l.RolID = r.RolID Where l.Usuario = :usuario AND l.Contrasenia = :contrasenia";
    let result = await BD.Open(sql, [user, pass], false);
    if(result.rows[0] == null){
        sql = "Select r.Nombre, p.PersonalID From Personal p Inner Join Rol r ON r.RolID = p.RolID Where Usuario = :usuario AND Contraseña = :pass AND Estado = '1'"
        result = await BD.Open(sql, [user, pass], false)
    }
    let userSchema = {};
    for (const user of result.rows){
        userSchema  = {
            "Rol" : user[0],
            "id" : user[1]
        }
    }
    res.send(userSchema);
}

module.exports = login;