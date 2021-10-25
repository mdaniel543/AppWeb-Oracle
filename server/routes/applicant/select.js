const BD = require('../../dbconfig');

async function user(req, res) {
    const {cui} = req.body
    sql = "Select ap.Nombre, TO_CHAR(Fecha_Postulacion, 'DD/MM/YYYY' ) Fecha_Postulacion, ap.Apellido, ap.Correo, ap.Direccion, ap.Telefono, ap.CV, ap.Primera_Vez, dp.DepartamentoID, dp.PuestoID, p.Nombre From Aplicante ap Inner Join Depa_Puesto dp ON ap.Depa_Puesto_ID = dp.Depa_Puesto_ID Inner Join Puesto p ON p.PuestoID = dp.PuestoID WHERE ap.CUI = :cui";
    let result = await BD.Open(sql, [cui], false);
    let userSchema = {};
    result.rows.map(user => {
        userSchema = {
            "nombre": user[0],
            "fecha": user[1],
            "apellido": user[2],
            "correo": user[3],
            "direccion": user[4],
            "telefono": user[5],
            "cv": user[6],
            "primera" : user[7],
            "depa": user[8],
            "puestoID": user[9],
            "puesto": user[10]
        }
    })
    console.log(userSchema)
    res.send(userSchema);
}

module.exports = user;