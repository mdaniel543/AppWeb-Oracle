const BD = require('../../dbconfig');
const email = require('../../utils/email');

async function insertAp(req, res) {
    console.log(req.body)
    const { cui, nombre, apellido, correo, direccion, telefono, cv, postu, depa, puesto} = req.body;
    sql = "Select p.PersonalID, p.Nombre, p.Correo, Count(*) as Conteo FROM Personal p Inner Join Aplicante ap ON ap.PersonalID = p.PersonalID Inner Join Departamento d ON d.DepaID = p.DepartamentoID AND d.DepaID = :depa Inner Join Rol r ON r.RolID = p.RolID AND r.Nombre = 'Revisor' GROUP BY p.PersonalID ORDER BY conteo ASC FETCH NEXT 1 ROWS ONLY"
    var result = await BD.Open(sql, [depa], false);
    if (result == undefined) {
        res.send({"msg": "No ha sido posible el registro en este puesto, por problemas con el departamento"})
        return;
    }
    const revisor = result[0][0];

    var revisorN = result[0][1];
    var email = result[0][2];    
    var subject = "Nuevo expediente a Revisar";
    var text = `Saludos ${revisorN} \n\n Un aplicante acaba de aplicar a un Puesto de su Departamento, se le asigno revisar su expediente cuando lo suba. \n\n Feliz dia \n\n\t Totonet S.A`;
    email.send(email, subject, text);

    sql = "Insert Into Aplicante(CUI, Nombrem Apellido, Correo, Direccion, Telefono, CV, Apto, Fecha_Postulacion, Estado_Expediente, Planilla, Depa_Puesto_ID, PersonalID) Select :cui, :nombre, :apellido, :correo, :direccion, :telefono, :cv, '0', :postu, '0', '2', Depa_Puesto_ID, :revisor FROM Depa_Puesto WHERE DepartamentoID = :depa AND PuestoID = :puesto";
    await BD.Open(sql, [cui, nombre, apellido, correo, direccion, telefono, cv, , postu, revisor, depa, puesto], true);

    res.send({"msg": "Aplicante registrado correctamente"});
}


  





module.exports = insertAp;