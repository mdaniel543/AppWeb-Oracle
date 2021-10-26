const BD = require('../../dbconfig');

async function insertAp(req, res) {
    console.log(req.body)
    const {ruta, cui, prid} = req.body;
    sql = "Insert Into Archivo(Ruta, Aceptado, AplicanteCUI, Puesto_Requi_ID) VALUES (:ruta, '2', :cui, :prid)";
    await BD.Open(sql, [ruta, cui, prid], true);
    res.json({"msg": "Expediente registrado correctamente"});
}

module.exports = insertAp;