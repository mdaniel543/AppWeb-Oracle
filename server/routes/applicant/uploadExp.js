var multer = require('multer')


function up(req, res) {
    var name = Date.now() 
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, 'upload/expedientes')
      },
      filename: function (req, file, cb) {
        cb(null, name + "-" + file.originalname)
      }
    });
    
    var upload = multer({ storage: storage }).single('file');
    
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.send({"msg": name + "-" + req.file.originalname})
    })
}

module.exports = up;