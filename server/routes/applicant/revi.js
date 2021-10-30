const BD = require('../../dbconfig');

async function user(req, res) {
    const {cui} = req.body
    sql = "Select P.Usuario, P.PersonalID FROM Aplicante ap Inner Join Personal p ON p.PersonalID = ap.PersonalID WHERE ap.Cui = :cui";
    let result = await BD.Open(sql, [cui], false);
    let userSchema = {};
    result.rows.map(user => {
        userSchema = {
            "nombre": user[0],
            "id": user[1]
        }
    })
    console.log(userSchema)
    res.send(userSchema);
}

module.exports = user;