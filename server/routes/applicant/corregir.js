const BD = require('../../dbconfig');

async function updateAp(req, res) {
    var {cui, archivoid, ruta} = req.body;
    sql = `Update Archivo Set Ruta = '${ruta}', Aceptado = '2' WHERE ArchivoID = ${archivoid}`;
    await BD.Open(sql, [], true);
    sql = `Update Aplicante Set Estado_Expediente = '2' WHERE CUI = ${cui}`
    await BD.Open(sql, [], true);
    res.json({"msg": "Editado correctamente"});
}

module.exports = updateAp;