const multer = require("multer");
const path = require('path') //Node.JS module


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./FRONT/assets")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
      }
  })

  const upload = multer({
    storage: storage,
    limits: { fileSize: '2000000' }, //limits file size to 2MB
    fileFilter: (req, file, cb) => { //a function that is used to filter which files are accepted
        const fileTypes = /jpeg|jpg|png|/ // checks whether the file's MIME type and extension match the accepted file types (which are defined using a regular expression)
        const mimeType = fileTypes.test(file.mimetype)  //Js reg expression check
        const extname = fileTypes.test(path.extname(file.originalname)) //path.extname() is a built-in function in the Node.js path module that returns the extension of a file path.

        if(mimeType && extname) {
            return cb(null, true)  //no error, file is accepted; 
        }
        cb("File format not accepted") //cb - callback is provided by multer
    }
})
  
module.exports = upload;

