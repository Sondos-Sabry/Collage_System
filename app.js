const express = require("express");
const multer = require("multer");
const bcrypt = require('bcrypt');
const cors = require("cors");
const app = express();
const port = 3000;

///upload files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
  cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

//middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));


///connection with mysql database
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "collage_system",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to database!");
  }
});

///for auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));
const connectLivereload = require("connect-livereload");
const { error } = require("console");
const { title } = require("process");
app.use(connectLivereload());
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

//viewsبتعامل كان انا واقف داخل فولدر
app.get("/", (req, res) => {
  res.render("Home");
});

//login form for student , admin and doctor
app.get("/login", (req, res) => {
  res.render("Login");
});
// Handle the form submission
app.post('/login', (req, res) => {
  console.log(req.body);

  const Email = req.body.Email;
  const Id = req.body.Id;
  const user = req.body.user;

  if (Email && Id) {
    if (user === 'Student') {
      const query = 'SELECT * FROM student WHERE Email = ? AND Id = ?';
      connection.query(query, [Email, Id], (error, data) => {
        if (data.length > 0) {
          if (data.Id = Id) {
            req.Id = data.Id;
            res.redirect('student_home');
          } else {
            res.send('Incorrect Id');
          }
        } else {
          res.send('Incorrect Email Address');
      }
        res.end();
      });
    } else if (user === 'Doctor') {
      const query = 'SELECT * FROM doctor WHERE Email = ? AND Id = ?';
      connection.query(query, [Email, Id], (error, data) => {
        if (data.length > 0) {
          if (data.Id = Id) {
            req.Id = data.Id;
            res.redirect('doctor_home');
          } else {
            res.send('Incorrect Id');
          }
        } else {
          res.send('Incorrect Email Address');
        }
        res.end();
      });
    } else if (user === 'Admin') {
      const query = 'SELECT * FROM admin WHERE Email = ? AND Id = ?';
      connection.query(query, [Email, Id], (error, data) => {
        if (data.length > 0) {
          if (data.Id = Id) {
            req.Id = data.Id;
            res.redirect('admin_home');
          } else {
            res.send('Incorrect Id');
          }
        } else {
          res.send('Incorrect Email Address');
        }
        res.end();
      });
    } else {
      res.end('Please Enter Email Address and Your Academic Id');
      res.end();
    }
  }
});

app.get("/upload", (req, res) => {

  var con= connection.query("SELECT  DISTINCT course_name FROM course; ", function (err, result , files) {
    if (err) throw err;
    console.log(result);
  res.render("upload",{course:result});
});  
});

//form to upload files
app.post("/upload", upload.single("filename"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  console.log(req.body.course_name);

  // Extract the file data from the request
  const file_name = req.file.filename;
  const path = req.file.path;
  const course_name = req.body.course_name;

  // SQL query to select the course_id based on the course_name
  const selectQuery = "SELECT course_id FROM course WHERE course_name = ?";
  connection.query(selectQuery, [course_name], (selectError, selectResults) => {
    if (selectError) {
      console.error('Error selecting course_id:', selectError);
      res.status(500).send('Error selecting course_id');
    } else {
      // Extract the course_id from the selectResults
      const courseId = selectResults[0].course_id;

      // SQL query to insert data into the doctor table
      const insertQuery = "INSERT INTO uploaded_files (file_name, path, course_id) VALUES (?, ?, ?)";
      connection.query(insertQuery, [file_name, path, courseId], (insertError, insertResults) => {
        if (insertError) {
          console.error('Error inserting data into doctor table:', insertError);
          res.status(500).send('Error inserting data into uploaded_files table');
        } else {
          console.log('Data inserted into uploaded_files table successfully');
          return res.redirect("display_course");
        }
      });
    }
  });
});


//form to add doctor 
app.post("/add_doctor", (req, res) => {
  console.log(req.body);
  console.log(req.file);
  console.log(req.body.course_name);

  // Extract the data from the request
  const FName = req.body.fname;
  const LName = req.body.lname;
  const Email = req.body.email;
  const Password = req.body.password;
  const Id = req.body.id;
  const course_name = req.body.course_name;

 // SQL query to select the course_id based on the course_name
  const selectQuery = "SELECT course_id FROM course WHERE course_name = ?";
  connection.query(selectQuery, [course_name], (selectError, selectResults) => {
    if (selectError) {
      console.error('Error selecting course_id:', selectError);
      res.status(500).send('Error selecting course_id');
    } else {
      // Extract the course_id from the selectResults
      const courseId = selectResults[0].course_id;

      // SQL query to insert data into the doctor table
      const insertQuery = "INSERT INTO doctor (doctor_Fname, doctor_Lname, Email, doctor_password, Id, course_id) VALUES (?, ?, ? ,?, ?, ?)";
      connection.query(insertQuery, [FName, LName, Email, Password, Id, courseId], (insertError, insertResults) => {
        if (insertError) {
          console.error('Error inserting data into doctor table:', insertError);
          res.status(500).send('Error inserting data into doctor table');
        } else {
          console.log('Data inserted into doctor table successfully');
          return res.redirect("display_course");
        }
      });
    }
  });
});

app.get("/add_doctor", (req, res) => {
  var con= connection.query("SELECT  DISTINCT course_name FROM course; ", function (err, result , files) {
    if (err) throw err;
    console.log(result);
  res.render("add_doctor",{course:result});
});  
});

app.get("/add_department", (req, res) => {
  res.render("add_department");
});
app.get("/add_cource", (req, res) => {
  res.render("add_material");
});

app.get("/absence", (req, res) => {
  res.render("absence");
});

app.get("/display_course", (req, res) => {
  res.render("display_course");
});

app.get("/download_course", (req, res) => {
  res.render("download_course");
});

app.get("/student_home", (req, res) => {
  res.render("student_home");
});
app.get("/doctor_home", (req, res) => {
  res.render("doctor_home");
});
app.get("/admin_home", (req, res) => {
  res.render("admin_home");
});


app.get("/enroll_course", (req, res) => {
  res.render("enroll_course");
});

//Add student
app.get("/add_student", (req, res) => {
    var con= connection.query("SELECT  DISTINCT department_name FROM department; ", function (err, result , files) {
      if (err) throw err;
      console.log(result);
    res.render("add_student",{department:result
});
});  
});
// Handle the form submission
app.post("/add_student", (req, res) => {
  const FName = req.body.fname;
  const LName = req.body.lname;
  const Email = req.body.email;
  const Password = req.body.password;
  const Id = req.body.id;
  const gender = req.body.gender;
  const department = req.body.department;

  // Insert the form data into the database
  const query ="INSERT INTO `student` ( `Fname`, `Lname`, `Email`, `password`, `Id`, `gender`, `department`) VALUES (?,?,?,?,?,?,?)";
    //"INSERT INTO student (FName, LName, Email, Password, Id, gender, department) VALUES(?, ?, ?, ?, ?, ?, ?)";
  connection.query(query, [FName, LName, Email, Password, Id, gender, department],(error, results) => {
      if (error) {
        console.error("Error inserting data:", error);
        res.send("Error inserting data");
      } else {
        console.log("Data inserted successfully");
      //  res.send("Data inserted successfully");
        res.render("admin_home")
      }
    }
  );
});



///404 error
app.use((req, res) => {
  res.status(404).send("sorry can't find that!");
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
