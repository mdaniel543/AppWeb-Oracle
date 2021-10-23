function sendCV(req, res){
    var fileLocation = `upload/cv/${req.body.d}`
    console.log(fileLocation);
    file = req.body.d
    res.contentType("application/pdf");
    res.download(fileLocation, file, (err) => {
            if (err) console.log(err);
    });
}

module.exports = sendCV;