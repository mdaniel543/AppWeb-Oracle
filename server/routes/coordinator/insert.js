const BD = require('../../dbconfig');
const emaile = require('../../utils/email');

async function insert(req, res) {
    console.log(req.body)
    const {cui, dp, depa, name, correo} = req.body;
    sql = "Select Sum(suma) From (" +
        " SELECT Sum(P.Salario) as suma FROM Aplicante ap" + 
        " Inner Join Depa_Puesto dp ON dp.Depa_Puesto_ID = ap.Depa_Puesto_ID" + 
        " Inner Join Departamento d ON dp.DepartamentoID = d.DepaID" + 
        " Inner Join Puesto p ON p.PuestoID = dp.PuestoID" + 
        " Where d.DepaID = :depa" +  
        " AND ap.Planilla = '1'"  +
        " UNION ALL" +
        " Select p.salario as suma From Depa_Puesto dp" +  
        " Inner Join Puesto p ON p.PuestoID = dp.PuestoID" +
        " Inner Join Departamento d ON d.DepaID = dp.DepartamentoID" +
        " WHERE dp.Depa_Puesto_ID = :dp" +
        " ) t ";
    var result = await BD.Open(sql, [depa, dp], false);
    var existente = result.rows[0][0]
    console.log(existente)
    sql = "SELECT d.CapitalTotal FROM Departamento d WHERE d.DepaID = :depa"
    var result2 = await BD.Open(sql, [depa])
    var capital = result2.rows[0][0]
    console.log(capital)
    if(existente > capital){
        res.json({"msg": "AGREGARLO A PLANTILLA IMPOSIBLE, No es posible ya que supera la capital del departamento"});
        return;
    }

    sql = "Update Aplicante SET Planilla = '1' WHERE Cui = :cui";
    await BD.Open(sql, [cui], true);
    var subject = 'Contratatado';
    var text = `Felicidades ${nombre}.  ha sido contradado para el puesto que aplico. Porfavor presentese a las oficinas el siguiente dia habil <p> Feliz Dia </p>`;
    emaile.sende(correo, subject, text);
    res.send({"msg": "Aplicante en planilla correctamente"});
}

module.exports = insert;