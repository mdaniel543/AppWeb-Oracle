const BD = require('../../dbconfig');
const emaile = require('../../utils/email');

async function insert(req, res) {
    const {correo, nombre, requisito, ruta, motivo, fecha, ida} = req.body;
    sql = `Insert INTO Historial(Ruta, Motivo, Fecha_Rechazado, ArchivoID) VALUES (:ruta, :motivo, TO_DATE(:fecha, 'YYYY-MM-DD'), :ida)`;
    await BD.Open(sql, [ruta, motivo, fecha, ida], true);


    var subject = "Archivo de su expediente Rechazado";
    var text = `Saludos ${nombre}. <p> El archvivo para el requisito: ${requisito} ha sido rechazado </p>  <p> Motivo: </p> <p> ${motivo} </p> <p> Ingrese a su perfil para poder corregirlo </p> Feliz dia Totonet S.A`;
    emaile.sende(correo, subject, text);


    res.json({"msg": "agregado al historial correctamente"});
}

module.exports = insert;