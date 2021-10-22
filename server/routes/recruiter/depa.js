const BD = require('../../dbconfig');

async function dep(req, res) {
    console.log(req.body)
    const {per} = req.body;
    sql = "Select d.DepaID, d.Nombre FROM Personal p Inner JOin Departamento d ON d.DepaID = p.DepartamentoID Where p.PersonalID = :per";
    let result = await BD.Open(sql, [per], false);
    let userSchema = {};
    for (const user of result.rows){
        userSchema  = {
            "id" : user[0],
            "nombre": user[1]
        }
    }
    console.log(userSchema);
    res.send(userSchema);
}

module.exports = dep;