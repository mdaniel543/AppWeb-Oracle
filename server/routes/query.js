const BD = require('../dbconfig');

async function saludo(req, res) {
    sql = "select * from nodetabs";

    let result = await BD.Open(sql, [], false);

    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "codu": user[0],
            "username": user[1],
            "firstname": user[2],
            "lastname": user[3]
        }

        Users.push(userSchema);
    })

    res.json(Users);
}

module.exports = saludo;