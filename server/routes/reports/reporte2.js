const BD = require('../../dbconfig');
const oracledb = require('oracledb');

async function report(req, res) {
    console.log(req.body)
    var { depa } = req.body;
    if(depa === "INSTITUCION COMPLETA"){
        depa = null
    }
    const binds = {
        depa: depa,
        salida: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT}
    }
    sql = "BEGIN  REPORT_2(:depa, :salida); END;";
    let resultado = await BD.SP(sql, binds)
        .then(resultado => res.json({resultado}))
        .catch(err => {res.send({"msg": err}); return;
    });

}
module.exports = report;