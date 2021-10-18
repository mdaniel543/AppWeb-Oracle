const BD = require('../../dbconfig');

async function deleteU(req, res) {
    const {idP, fin} = req.body;
    const fins = fin.replace(/[']/g, "");
    console.log(fins)
    sql = "Update Personal Set Fecha_Fin = TO_DATE('" + fins + "', 'YYYY-MM-DD'), Estado = '0' WHERE PersonalID = :idPs";   
    await BD.Open(sql, [idP], true);
    res.json({"msg": "Usuario eliminado correctamente"});
}

module.exports = deleteU;