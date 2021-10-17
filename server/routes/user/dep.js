const BD = require('../../dbconfig');

async function user(req, res) {
    sql = "Select Nombre From Departamento";
    let result = await BD.Open(sql, [], false);
    Users = [];
    result.rows.map(user => {
        let userSchema = {
            "nombre": user[0],
        }
        Users.push(userSchema);
    })
    res.json(Users);
}

module.exports = user;