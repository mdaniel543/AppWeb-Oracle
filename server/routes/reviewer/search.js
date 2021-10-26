const BD = require('../../dbconfig');

async function archivos(req, res){
    console.log(req.body);
    var {personal, pueston, estado, nombree} = req.body;
    if(pueston != null) pueston = `'${pueston}'`;
    if(estado != null) estado = `'${estado}'`;
    if(nombree != null) nombree = `'${nombree}'`;
    sql = `SELECT ap.CUI, ap.Nombre, p.Nombre, ap.Estado_Expediente FROM Aplicante ap INNER JOIN Depa_Puesto dp ON dp.Depa_Puesto_ID = ap.Depa_Puesto_ID Inner JOin Puesto p ON p.PuestoID = dp.PuestoID WHERE ap.PersonalID = :personal AND (ap.Nombre = ${nombree} OR ${nombree} is null) AND (p.Nombre = ${pueston} OR ${pueston} is null) AND (ap.Estado_Expediente = ${estado} OR ${estado} is null)`
    var result = await BD.Open(sql, [personal], false);
    Aplicante = [];
    for(const requi of result.rows){
        var cui = requi[0];
        var nombre = requi[1];
        var puesto = requi[2];
        var estado_e = requi[3];
        
        sql = "Select r.RequisitoID, r.Nombre, a.ArchivoID, a.Aceptado, a.Ruta FROM Archivo a INNER JOIN Puesto_Requisito pr ON pr.Puesto_Requi_ID = a.Puesto_Requi_ID INNER JOIN Requisito r ON r.RequisitoID = pr.RequisitoID WHERE a.AplicanteCUI = :cui"
        var result2 = await BD.Open(sql, [cui], false);
        archivo = [];
        result2.rows.map(arch => {
            let shema = {
                "id": arch[0],
                "requisito": arch[1],
                "archivoID": arch[2],
                "aceptado": arch[3],
                "ruta": arch[4]
            }
            archivo.push(shema);
        })
        let userSchema = {
            "cui": cui,
            "nombre": nombre,
            "puesto": puesto,
            "estado_e": estado_e,
            "archivos": archivo
        }
        Aplicante.push(userSchema);
    }

    res.json(Aplicante);
}

module.exports = archivos;