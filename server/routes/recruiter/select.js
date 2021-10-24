const BD = require('../../dbconfig');

async function user(req, res) {
    const {depa} = req.body
    sql = "Select ap.Nombre, p.Nombre, TO_CHAR(Fecha_Postulacion, 'DD/MM/YYYY' ) Fecha_Postulacion, ap.CUI, ap.Apellido, ap.Correo, ap.Direccion, ap.Telefono, ap.CV, ap.Apto From Aplicante ap Inner Join Depa_Puesto dp On dp.Depa_Puesto_ID = ap.Depa_Puesto_ID Inner Join Puesto p ON p.PuestoID = dp.PuestoID Inner Join Departamento d ON d.DepaID = dp.DepartamentoID AND d.DepaID = :depa";
    let result = await BD.Open(sql, [depa], false);
    Users = [];
    result.rows.map(user => {
        let userSchema = {
            "nombre": user[0],
            "puesto": user[1],
            "fecha": user[2],
            "cui": user[3],
            "apellido": user[4],
            "correo": user[5],
            "direccion": user[6],
            "telefono": user[7],
            "cv": user[8],
            "apto": user[9]
        }
        Users.push(userSchema);
    })
    res.json(Users);
}

module.exports = user;