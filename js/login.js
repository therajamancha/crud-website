// login page
let logName = document.querySelector('#username');
let logEmail = document.querySelector('#logemail');
let password = document.querySelector('#password');
let loginBtn = document.querySelector('#loginbtn');
let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validateEmail= (email) => {
    return regex.test(String(email).toLowerCase());
}

function loginValidation(){
    valid = true;
    if (logName.value == "") {
        alert("Enter Name");
        valid = false;
    }else if(logEmail.value == ""  ){
        alert("Enter Email");
        valid = false;
    }else if(!(validateEmail(logEmail.value))){
        alert("Enter Valid Email")
        valid = false;
    }else if(password.value == ""){
        alert("Enter Password");
        valid = false;
    }
    return valid;
}

function craeteCookie(){
    let user = {
        name:logName.value,
        email:logEmail.value,
        passcode:password.value
    }
    console.log(user);
    document.cookie = `${JSON.stringify(user)};`;
}
function redirectFun(){
    if(document.cookie != ""){
      window.location.assign("http://127.0.0.1:5500/index.html");
    //   window.location.assign("https://rajamanchacrud.netlify.app");
    }
}
loginBtn.onclick = function(){
    if (loginValidation() == true) {
        craeteCookie();
        redirectFun();
    }
}
