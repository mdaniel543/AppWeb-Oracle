const BD = require('../../dbconfig');

async function updateAp(req, res) {
    var {cui, nombre, apellido, correo, direccion, telefono, cv} = req.body;
    if (cv != null) cv = `'${cv}'`
    sql = `Update Aplicante SET Nombre = '${nombre}', Apellido = '${apellido}', Correo = '${correo}', Direccion = '${direccion}', Telefono = '${telefono}', CV = NVL(${cv}, CV) WHERE CUI = ${cui}`;
    await BD.Open(sql, [], true);
    res.json({"msg": "Editado correctamente"});
}

module.exports = updateAp;