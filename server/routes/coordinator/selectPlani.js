const BD = require('../../dbconfig');

async function user(req, res) {
    const {depa} = req.body
    sql = "SELECT p.Nombre, ap.Nombre, TO_CHAR(Fecha_Postulacion, 'DD/MM/YYYY' ) Fecha_Postulacion, ap.CUI, ap.Apellido, ap.Correo, ap.Direccion, ap.Telefono, ap.CV, ap.Planilla " +
    " FROM APLICANTE ap " +
    " Inner Join Depa_Puesto dp ON ap.Depa_Puesto_ID = dp.Depa_Puesto_ID" + 
    " AND dp.DepartamentoID = :depa " + 
    " Inner Join Puesto p ON p.PuestoID = dp.PuestoID" +
    " Where ap.Estado_Expediente = '1' AND (ap.Planilla = '1' OR ap.Planilla = '3')"
    let result = await BD.Open(sql, [depa], false);
    Users = [];
    result.rows.map(user => {
        let userSchema = {
            "puesto": user[0],
            "nombre": user[1],
            "fecha": user[2],
            "cui": user[3],
            "apellido": user[4],
            "correo": user[5],
            "direccion": user[6],
            "telefono": user[7],
            "cv": user[8],
            "planilla": user[9]
        }
        Users.push(userSchema);
    })
    res.json(Users);
}

module.exports = user;