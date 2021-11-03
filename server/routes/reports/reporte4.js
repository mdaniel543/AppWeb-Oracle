const BD = require('../../dbconfig');
const oracledb = require('oracledb');

async function report(req, res) {
    const binds = {
        salida: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT}
    }
    sql = "BEGIN  REPORT_4(:salida); END;";
    let resultado = await BD.SP(sql, binds)
        .then(resultado => res.json({resultado}))
        .catch(err => {res.send({"msg": err}); return;
    });

}

module.exports = report;