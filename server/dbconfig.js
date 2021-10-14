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

exports.Open = Open;