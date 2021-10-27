const BD = require('../../dbconfig');
const emaile = require('../../utils/email');

async function insertAp(req, res) {
    console.log(req.body)
    const { cui, nombre, apellido, correo, direccion, telefono, cv, postu, depa, puesto} = req.body;
    sql = "SELECT n.id, n.us, n.correo, NVL(Conteo, 0) as nv FROM " + 
    "(Select p.personalid as id, p.usuario as us, p.Correo as correo From Personal p " +
    "Inner Join Rol r ON r.RolID = p.RolID AND r.Nombre = 'Revisor' WHERE p.departamentoid = :depa AND p.estado = '1') n Left JOIN " +  
    "(Select ap.personalID as id, Count(ap.personalID) as conteo FROM Aplicante ap Group by ap.personalid)  rn "+
    "ON n.id = rn.id ORDER BY nv ASC FETCH NEXT 1 ROWS ONLY"
    var result = await BD.Open(sql, [depa], false);
    if (result.rows[0] == null) {
        res.send({"msg": "No ha sido posible el registro en este puesto, por problemas con el departamento"})
        return;
    }
    const revisor = result.rows[0][0];
    var revisorN = result.rows[0][1];
    var email = result.rows[0][2];    
    var subject = "Nuevo expediente a Revisar";
    var text = `Saludos ${revisorN}. <p> Un aplicante se postulo para un puesto de su departamento. Se le asigno a usted su expediente para revision cuando sea subido. </p> Feliz dia Totonet S.A`;
    emaile.sende(email, subject, text);

    sql = "Insert Into Aplicante(CUI, Nombre, Apellido, Correo, Direccion, Telefono, CV, Apto, Fecha_Postulacion, Estado_Expediente, Planilla, Depa_Puesto_ID, PersonalID, Primera_Vez) Select :cui, :nombre, :apellido, :correo, :direccion, :telefono, :cv, '2', TO_DATE(:postu, 'YYYY/MM/DD'), '2', '2', Depa_Puesto_ID, :revisor, '1' FROM Depa_Puesto WHERE DepartamentoID = :depa AND PuestoID = :puesto";
    await BD.Open(sql, [cui, nombre, apellido, correo, direccion, telefono, cv, postu, revisor, depa, puesto], true);

    res.send({"msg": "Aplicante registrado correctamente"});
}

module.exports = insertAp;