const express = require('express')
const multer  = require('multer')

const app = express()
const port = 3000

///upload files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null,'uploads/')
  },
filename:function(req,file,cb){
cb(null, Date.now() + path.extname(file.originalname));
}
}) 
const upload = multer({ storage })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));

///connection with mysql database
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'collage_system'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database!');
  }
});

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

// upload files
app.post('/upload', upload.single('filename'),(req, res) => {
  console.log(req.body);
  console.log(req.file);
  return res.redirect('/')

})

//viewsبتعامل كان انا واقف داخل فولدر 
app.get("/", (req, res) => {
    res.render("Home")
});

app.get("/login", (req, res) => {
    res.render("Login")
});
app.get("/student_home", (req, res) => {
  let sql="SELECT * FROM student";
  let query=connection.query(sql,(err,rows)=>{
    if(err) throw err;
    res.render("student_home",{
    student:rows

    });

  });
    
});
app.get("/doctor_home", (req, res) => {
  let sql="SELECT * FROM doctor";
 
  let query=connection.query(sql,(err,rows)=>{
    if(err) throw err;
    res.render("doctor_home",{
   doctor: rows
    });
  
  });
});





app.post('/addDep',(req,res)=>{
  
  var department_name = req.body.department_name;

	var department_code = req.body.department_code;

	var sql = `
	INSERT INTO department 
	(department_name, department_code) 
	VALUES ("${department_name}", "${department_code}")
	`;
  let query=connection.query(sql,(err,result)=>{
    if(err) throw err;
    res.redirect("add_department")
  });
});


app.get("/admin_home", (req, res) => {
  let sql="SELECT * FROM admin"
  let query=connection.query(sql,(err,rows)=>{
    if(err) throw err;
    res.render("admin_home",{
    admin:rows  
    })

  })
  
});
app.get("/upload", (req, res) => {
  res.render("upload")
});
app.get("/add_doctor", (req, res) => {
  res.render("add_doctor")
});
app.get("/add_department", (req, res) => {
  res.render("add_department")
});
app.get("/add_cource", (req, res) => {
  res.render("add_material")
});
app.get("/add_student", (req, res) => {
  res.render("add_student")
});
app.get("/absence", (req, res) => {
  res.render("absence")
});

app.get("/display_course", (req, res) => {
  res.render("display_course")
});

app.get("/download_course", (req, res) => {
  res.render("download_course")
});

app.get("/enroll_course", (req, res) => {
  res.render("enroll_course")
});


///404 error
/*app.use((req, res) => {
    res.status(404).send("sorry can't find that!")
});*/
  
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
