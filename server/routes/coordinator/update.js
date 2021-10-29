const BD = require('../../dbconfig');

async function update(req, res) {
    var {cui, estado} = req.body;
    console.log(req.body)
    sql = `Update Aplicante SET Planilla = '${estado}' WHERE Cui = ${cui}`;
    await BD.Open(sql, [], true);
    res.json({"msg": "Correcto"});
}

module.exports = update;