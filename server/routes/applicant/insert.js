const BD = require('../../dbconfig');
const emaile = require('../../utils/email');

async function insertAp(req, res) {
    console.log(req.body)
    const { cui, nombre, apellido, correo, direccion, telefono, cv, postu, depa, puesto} = req.body;
    sql = "SELECT  n.id, n.us, n.correo, NVL(Conteo, 0) as nv" + 
    " FROM (Select ap.personalID AS id, count(*) as Conteo from Aplicante ap GROUP BY ap.PersonalID) rn" + 
    " RIGHT JOIN (Select p.PersonalID as id, p.usuario as us, p.Correo as correo FROM Personal p Inner Join Departamento d ON d.DepaID = p.DepartamentoID AND d.DepaID = :depa Inner Join Rol r ON r.RolID = p.RolID AND r.Nombre = 'Revisor') n ON n.id = rn.id Group BY n.id, n.us, n.correo, rn.id  ORDER BY Conteo ASC FETCH NEXT 1 ROWS ONLY"
    var result = await BD.Open(sql, [depa], false);
    if (result == undefined) {
        res.send({"msg": "No ha sido posible el registro en este puesto, por problemas con el departamento"})
        return;
    }
    const revisor = result.rows[0][0];
    var revisorN = result.rows[0][1];
    var email = result.rows[0][2];    
    var subject = "Nuevo expediente a Revisar";
    var text = `Saludos ${revisorN}. \n\n Un aplicante se postulo para un puesto de su departamento. Se le asigno a usted su expediente para revision cuando sea subido. \n\n Feliz dia \n\n\t Totonet S.A`;
    emaile.sende(email, subject, text);

    sql = "Insert Into Aplicante(CUI, Nombre, Apellido, Correo, Direccion, Telefono, CV, Apto, Fecha_Postulacion, Estado_Expediente, Planilla, Depa_Puesto_ID, PersonalID) Select :cui, :nombre, :apellido, :correo, :direccion, :telefono, :cv, '0', TO_DATE(:postu, 'YYYY/MM/DD'), '0', '2', Depa_Puesto_ID, :revisor FROM Depa_Puesto WHERE DepartamentoID = :depa AND PuestoID = :puesto";
    await BD.Open(sql, [cui, nombre, apellido, correo, direccion, telefono, cv, postu, revisor, depa, puesto], true);

    res.send({"msg": "Aplicante registrado correctamente"});
}


  





module.exports = insertAp;