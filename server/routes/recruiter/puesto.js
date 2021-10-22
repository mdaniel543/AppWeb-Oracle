const BD = require('../../dbconfig');

async function user(req, res) {
    const {depa} = req.body;
    sql = "Select p.Nombre From Puesto p Inner Join Depa_Puesto dp ON dp.PuestoID = p.PuestoID Inner Join Departamento d ON d.DepaID = dp.DepartamentoID AND d.DepaID = :depa";
    let result = await BD.Open(sql, [depa], false);
    Users = [];
    result.rows.map(user => {
        Users.push(user[0]);
    })
    res.json(Users);
}

module.exports = user;