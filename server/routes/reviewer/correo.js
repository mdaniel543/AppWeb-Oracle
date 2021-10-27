
const emaile = require('../../utils/email');

async function insert(req, res) {
    const {correo, nombre} = req.body;

    var subject = "Expediente Aceptado";
    var text = `Saludos ${nombre}. <p> Su expediente ha sido aceptado, a la espera de su contratacion...</p> Feliz dia Totonet S.A`;
    emaile.sende(correo, subject, text);


    res.json({"msg": "correo enviado correctamente"});
}

module.exports = insert;