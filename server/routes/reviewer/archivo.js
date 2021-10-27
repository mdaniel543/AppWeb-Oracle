const BD = require('../../dbconfig');

async function insert(req, res) {
    const { ida, estado} = req.body;
    sql = `UPDATE Archivo SET Aceptado = '${estado}' WHERE ArchivoID = ${ida}`;
    await BD.Open(sql, [], true);
    res.json({"msg": "archivo editado correctamente"});
}

module.exports = insert;