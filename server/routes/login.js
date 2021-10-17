const BD = require('../dbconfig');

async function login(req, res) {
    const { user, pass} = req.body;
    sql = "Select r.Nombre From login l Inner Join Rol r ON l.RolID = r.RolID Where l.Usuario = :usuario AND l.Contrasenia = :contrasenia";
    let result = await BD.Open(sql, [user, pass], false);
    let userSchema = {};
    for (const user of result.rows){
        userSchema  = {
            "Rol" : user[0]
        }
    }
    res.send(userSchema);
}

module.exports = login;