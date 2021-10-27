const BD = require('../../dbconfig');

async function login(req, res) {
    console.log(req.body)
    const {per} = req.body;
    sql = "Select p.Usuario From Personal p WHERE PersonalID = :per";
    let result = await BD.Open(sql, [per], false);

    let userSchema = {};
    for (const user of result.rows){
        userSchema  = {
            "nombre": user[0]
        }
    }
    res.send(userSchema);
}

module.exports = login;