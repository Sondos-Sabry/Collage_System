const express = require('express')
const multer  = require('multer')
const app = express()
const port = 4000

const storage = multer.diskStorage({
  //cb...callback function
  destination: function (req, file, cb) {
  cb(null,'./uploads')
    },
    filename:function(req,file,cb){
cb(null, Date.now() + path.extname(file.originalname));
  }
}) 

  const upload = multer({ storage })


app.set('view engine', 'ejs')
// app.set("views", path.resolve("/views"))

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));

///for auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

const connectLivereload = require("connect-livereload");
const { error } = require('console')
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
}); 


app.post('/upload', upload.single('filename'),(req, res) => {
    console.log(req.body);
    console.log(req.file);
    return res.redirect('/uploads')

})
app.get("/", (req, res) => {
    res.render("Home")
});
app.get("/upload", (req, res) => {
    res.render("upload")
  });
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  })