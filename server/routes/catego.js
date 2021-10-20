const BD = require('../dbconfig');

async function cat(req, res) {
    sql = "Select Nombre From Categoria";
    let result = await BD.Open(sql, [], false);
    Users = [];
    result.rows.map(user => {
        Users.push(user[0]);
    })
    res.json(Users);
}

module.exports = cat;