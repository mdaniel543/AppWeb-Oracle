const BD = require('../../dbconfig');

async function insert(req, res) {
    const {cui} = req.body;
    sql = " Select r.Nombre, h.historialid, h.ruta, h.motivo, TO_CHAR(h.Fecha_Rechazado, 'DD/MM/YYYY' ) Fecha_Rechazado From Historial h Inner Join Archivo a ON  a.ArchivoID = h.ArchivoID Inner Join Puesto_Requisito pr ON pr.Puesto_Requi_ID = a.Puesto_Requi_ID Inner Join Requisito r ON r.RequisitoID = pr.requisitoid WHERE a.AplicanteCUI = :cui";
    var result = await BD.Open(sql, [cui], false);
    tasks = [];
    for(const requi of result.rows){
        let userSchema = {
            "requisito": requi[0],
            "id": requi[1],
            "ruta": requi[2],
            "motivo": requi[3],
            "fecha": requi[4]        
        }
        tasks.push(userSchema);
    }
    res.json(tasks);
}

module.exports = insert;