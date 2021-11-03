const BD = require('../../dbconfig');
const oracledb = require('oracledb');

async function report(req, res) {
    console.log(req.body)
    const { depa } = req.body;
    const binds = {
        depa: depa,
        salida: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT}
    }
    sql = "BEGIN  REPORT_2(:depa); END;";
    let resultado = await BD.SP(sql, binds)
        .then(resultado => res.send({"msg": resultado}))
        .catch(err => {res.send({"msg": err}); return;
    });

}

module.exports = report;