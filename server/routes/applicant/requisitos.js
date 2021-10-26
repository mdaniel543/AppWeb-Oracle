const BD = require('../../dbconfig');

async function requisitos(req, res){
    const {puesto} = req.body;
    sql = "Select pr.puesto_requi_id, r.requisitoid, r.nombre, r.tamanio, r.obligatorio From Puesto_Requisito pr Inner Join Puesto p On p.PuestoID = pr.PuestoID Inner Join Requisito r ON r.RequisitoID = pr.RequisitoID WHERE p.PuestoID = :puesto"
    var result = await BD.Open(sql, [puesto], false);
    Requis = [];
    for(const requi of result.rows){
        var id = requi[0];
        var requisitoid = requi[1];
        var requisito = requi[2];
        var tamanio = requi[3];
        var obligatorio = requi[4];

        sql = "Select rf.Requi_Forma_ID, f.FormatoID, f.Nombre From Requisito_Formato rf Inner Join Formato f ON f.FormatoID = rf.FormatoID Inner Join Requisito r ON r.RequisitoID = rf.RequisitoID AND r.RequisitoID = :requisitoid"
        var result2 = await BD.Open(sql, [requisitoid], false);
        formatos = [];
        result2.rows.map(formato => {
            let shema = {
                "id": formato[0],
                "formatoid": formato[1],
                "formato": formato[2]
            }
            formatos.push(shema);
        })
        let userSchema = {
            "id": id,
            "requisitoid": requisitoid,
            "requisito": requisito,
            "tamanio": tamanio,
            "obligatorio": obligatorio[0],
            "formatos": formatos,
            "util": null
        }
        Requis.push(userSchema);
    }
    console.log(Requis);
    res.json(Requis);
}

module.exports = requisitos;