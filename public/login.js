function SaveStudentDetails() {
    validateControls();
}

function validateControls(){


      //UserName
      var name = document.getElementById("name")
      if (name.value == "") {
          window.alert("please enter your Username");
          name.focus();
          return false;
      }

       // Password
    var pass = document.getElementById("pass")
    if (pass.value == "") {
        window.alert("please enter your password");
        pass.focus();
        return false;
    }

    getControlValues();

}