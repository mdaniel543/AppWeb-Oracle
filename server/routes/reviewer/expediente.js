const BD = require('../../dbconfig');

async function insert(req, res) {
    const { cui, estado} = req.body;
    sql = `UPDATE Aplicante SET Estado_Expediente = '${estado}' WHERE CUI = ${cui}`;
    await BD.Open(sql, [], true);
    res.json({"msg": "expediente editado correctamente"});
}

module.exports = insert;