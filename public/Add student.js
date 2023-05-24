function SaveStudentDetails() {
    validateControls();
}
var gender;
var specialization = [];
function validateControls() {
    //FirstName
    var fname = document.getElementById("fname")
    if (fname.value == "") {
        window.alert("please enter your first name");
        fname.focus();
        return false;
    }
    //LastName
    var lname = document.getElementById("lname")
    if (lname.value == "") {
        window.alert("please enter your last name");
        lname.focus();
        return false;
    }

    // Password
    var password = document.getElementById("password")
    if (password.value == "") {
        window.alert("please enter your password");
        password.focus();
        return false;
    }

    //Email
    var email = document.getElementById("email")
    if (email.value == "") {
        window.alert("please enter your valid email Id");
        email.focus();
        return false;
    }
    //Id
    var id = document.getElementById("id")
    if (id.value == "") {
        window.alert("please enter your 6 digits id no.");
        id.focus();
        return false;
    }
    //Gender   
    gender = document.querySelector('input[name="gender"]:checked');
    if (gender === null) {
        window.alert("Gender required!");
        gender.focus();
        return false;
    }

    //Address
    var address = document.getElementById("address")
    if (address.value == "") {
        window.alert("please enter your address details");
        address.focus();
        return false;
    }

    // Specialization

    var specializationArray = document.getElementsByClassName('specialization');
    for (var i = 0; specializationArray[i]; ++i) {
        if (specializationArray[i].checked) {
            specialization.push(specializationArray[i].value);
        }
    }
    if (specialization == "") {
        alert("Specialization required!");
        return false;
    }


    getControlValues();

}