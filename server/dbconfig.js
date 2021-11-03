const oracledb = require('oracledb');

cns = {
    user :  "admin",
    
    password : "Cool4321-710911",
    
    connectString :  "mia-database.ceofh9t5ekgu.us-east-2.rds.amazonaws.com:/orcl",
};

async function Open(sql, binds, autoCommit) {
    let cnn = await oracledb.getConnection(cns);
    let result = await cnn.execute(sql, binds, { autoCommit });
    cnn.release();
    return result;
}

async function SP(sql, binds) {
    let cnn = await oracledb.getConnection(cns);
    let result = await cnn.execute(sql, binds, {prefetchRows:1000, fetchArraySize: 100});
    const SetResult = result.outBinds.salida;
    const rows = await SetResult.getRows();
    await SetResult.close();
    cnn.release();
    return rows;    
}

exports.Open = Open;
exports.SP = SP;