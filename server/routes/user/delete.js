const BD = require('../../dbconfig');

async function insert(req, res) {
    const { id, fin} = req.body;
    sql = "Update Personal Set Estado = '0', Fecha_Fin = :fin WHERE PersonalID = :id"   
    await BD.Open(sql, [id, fin], true);
    res.json({"msg": "Usuario creado correctamente"});
}

module.exports = insert;