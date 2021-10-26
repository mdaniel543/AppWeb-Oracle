const BD = require('../../dbconfig');

async function updateAp(req, res) {
    var {cui} = req.body;
    console.log(cui);
    sql = `UPDATE Aplicante SET Primera_Vez = '0' WHERE CUI = ${cui}`;
    await BD.Open(sql, [], true);
    res.json({"msg": "Editado correctamente"});
}

module.exports = updateAp;