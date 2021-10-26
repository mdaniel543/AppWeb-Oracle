const BD = require('../../dbconfig');

async function user(req, res) {
    console.log(req.body)
    const {cui} = req.body;
    console.log(cui)
    sql = "Select a.ArchivoID, a.ruta, a.Aceptado, r.nombre From Archivo a Inner Join Aplicante ap ON ap.CUI = a.AplicanteCUI Inner Join Puesto_Requisito pr ON pr.Puesto_Requi_ID = a.Puesto_Requi_ID Inner Join Requisito r ON r.RequisitoID = pr.RequisitoID WHERE a.AplicanteCUI = :cui"; 
    let result = await BD.Open(sql, [cui], false);
    Users = [];
    result.rows.map(user => {
        let userSchema = {
            "id": user[0],
            "archivo": user[1],
            "aceptado": user[2],
            "requisito": user[3]
        }
        Users.push(userSchema);
    })
    console.log(Users)
    res.json(Users);
}

module.exports = user;