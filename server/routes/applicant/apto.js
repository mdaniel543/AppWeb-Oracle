const BD = require('../../dbconfig');

async function apto(req, res) {
    const { apto, cui} = req.body;
    console.log(req.body);
    sql = `Update Aplicante SET Apto = '${apto}' WHERE CUI = ${cui}`;
    await BD.Open(sql, [], true);
    res.json({"msg": "Aplicante editado correctamente"});
}

module.exports = apto;