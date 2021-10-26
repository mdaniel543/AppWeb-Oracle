function send(req, res){
    var fileLocation = `upload/expedientes/${req.body.d}`
    console.log(fileLocation);
    file = req.body.d
    res.download(fileLocation, file, (err) => {
            if (err) console.log(err);
    });
}

module.exports = send;