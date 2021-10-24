const BD = require('../../dbconfig');
var generator = require('generate-password');
const emaile = require('../../utils/email');

async function apto(req, res) {
    const { apto, cui, correo, puesto, nombre} = req.body;
    console.log(req.body);
    sql = `Update Aplicante SET Apto = '${apto}' WHERE CUI = ${cui}`;
    await BD.Open(sql, [], true);    
    var subject = "Noticias de puesto aplicado";
    if(apto === '1'){
        var password = generator.generate({
            length: 10,
            numbers: true
        });
        var text = `<h3>Saludos ${nombre}.</h3> \n\n<p>Su solicitud al puesto: ${puesto} fue aceptada. </p> <p> CREDENCIALES: </p> <b> Usuario: </b> ${cui} <b> Contraseña: </b> ${password} <p> Ingrese con sus creedenciales para seguir con el proceso </p> \n\n Feliz dia \n\n\t Totonet S.A`;
        emaile.sende(correo, subject, text);
        sql = "Insert Into login(Usuario, Contrasenia, RolID, AplicanteCUI) Select :cui, :password, RolID, :cui From Rol Where Nombre = 'Aplicante'"
        await BD.Open(sql, [cui, password], true);
    }
    res.json({"msg": "Aplicante editado correctamente"});
}

module.exports = apto;