const express = require("express")
const multer = require("multer")
const expressFileUpload = require("express-fileupload")
const fs = require("fs").promises
let app = express()
app.use(expressFileUpload())
let storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "uploads")
    },
    filename: (req, file, cb)=>{
        const {originalName} =file
        cb(null, originalName)
    } 
})
let upload = multer({
    storage
})
app.use(express.static('public'));
//Set html view engine
app.get("/", (req,res)=>{
    res.render("index")
})
app.post("/upload/file/",upload.single("fileName"),(req,res)=>{
    return res.json({
        status:"Ok"
    })
})
app.post("/upload/",(req, res)=>{
    if (req.files){
        let file = req.files.fileName
        let fileName = file.name
        file.mv("./uploads/"+fileName, (err)=>{
            if(!err){
                return res.json({
                    status :"File Uploaded"
                })
            }
            else
            {
                return res.json({
                    status: "Error"
                })
            }
        })
    }
})
async function open_dir(){
   const files =  await fs.readdir("uploads")
   /*return console.log(files)
*/}
function createDir(){

}
open_dir()
PORT = process.env.PORT || 4000 
app.listen(PORT,()=>{console.log("Listening on port http://localhost:"+PORT)})