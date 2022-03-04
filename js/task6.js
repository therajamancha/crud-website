// Location JSON
const Locations = {
    'India': {
        'Gujrat': ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
        'Maharashtra': ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik"],
        'Delhi': ["New Delhi", "Firozabad", "Tughlakabad", "Siri", "Mehrauli"],
        'Telangana': ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Gadwal"],
        'Rajasthan': ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer"]
    },
    'United States': {
        'Alaska': ["Anchorage", "Juneau", "Fairbanks", "Badger", "Wasilla"],
        'Texas': ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth"],
        'California': ["Los Angeles", "Oakland", "Santa Ana", "Modesto", "Fontana"],
        'New Mexico': ["Albuquerque", "Las Cruces", "Rio Rancho", "Santa Fe", "Roswell"],
        'New York': ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse"]
    },
    'Canada': {
        'Alberta': ["Calgary", "Edmonton", "Red Deer", "Lethbridge", "St. Albert"],
        'Ontario': ["Toronto", "Ottawa", "Mississauga", "Brampton", "Hamilton"],
        'British Columbia': ["Vancouver", "Victoria", "Kelowna", "Penticton", "Whistler"],
        'Quebec': ["La Tuque", "Senneterre", "Rouyn-Noranda", "Val-d'Or", "Greater Sudbury"],
        'Nova Scotia': ["Kings Subd B.", "Amherst", "Lunenburg", "Queens", "Truro"]
    }
}
// variable selector
let fname = document.querySelector("#fname");
let lname = document.querySelector("#lname");
let dob = document.querySelector("#dob");
let addr = document.querySelector("#address");
let area = document.querySelector("#area");
let pincode = document.querySelector("#pincode");
let country = document.querySelector('#country');
let state = document.querySelector("#state");
let city = document.querySelector("#city");
let whatGender;
let male = document.getElementById("male");
let female = document.getElementById("female");
let other = document.getElementById("other");
let married = document.querySelector("#married");
let table = document.querySelector(".user-table tbody");
let submitBtn = document.querySelector("#submitBtn");
let editBtn = document.querySelector("#editBtn");
let cheacker = document.getElementsByName('cheaker');
let selecetAll = document.querySelector('#selectall');
let deselctall = document.querySelector('#deselctall');
let deleteAll = document.querySelector('#deleteall');
// creating user array
let userArray = [];
// disable edit button
editBtn.classList.add("disable");
// country function
function countryFun(cntrObj) {
    Object.keys(cntrObj).map(function (value) {
        let option = document.createElement("option");
        let text = document.createTextNode(value);
        option.appendChild(text);
        option.setAttribute("value", value);
        country.appendChild(option);
    });
}
// state function
function stateFun(cntrObj) {
    Object.keys(cntrObj).map(function (value) {
        let option = document.createElement("option");
        let text = document.createTextNode(value);
        option.appendChild(text);
        option.setAttribute("value", value);
        state.appendChild(option);
    });
}
// city function
function cityFun(cntrObj) {
    cntrObj.map(function (value) {
        let option = document.createElement("option");
        let text = document.createTextNode(value);
        option.appendChild(text);
        option.setAttribute("value", value);
        city.appendChild(option);
    });
}
// contry select
countryFun(Locations);
// state select
country.onchange = function () {
    let stateVal = Locations[country.value];
    state.length = 1; // reset selecet
    city.length = 1; // reset selecet
    stateFun(stateVal);
}
// city select
state.onchange = function () {
    let stateVal = Locations[country.value];
    let cityVal = stateVal[state.value];
    city.length = 1; // reset selecet
    cityFun(cityVal);
}
// craete object on submit
submitBtn.onclick = function () {
    if (formValidation() == true) {
    // if (true) {
    // Gender
        if (male.checked == true) {
            whatGender = "Male";
        } else if (female.checked == true) {
            whatGender = "Female";
        } else if (other.checked == true) {
            whatGender = "Other";
        } else {
            whatGender = "";
        }
        // is married
        let ismarrry = ""
        if (married.checked == true) {
            ismarrry = "Married";
        } else if (married.checked == false) {
            ismarrry = "Unmarried";
        }
        // uniqu id 
        let idIs;
        if (userArray.length == 0) {
            idIs = 1; // if length 0 then first user id is 1
        } else {
            // if user more then one the id max plus 1 
            let userIdarry = userArray.map((x, i) => userArray[i].id);
            idIs = Math.max(...userIdarry) + 1;
        }

        let user = {
            isSeleceted: false,
            id: idIs++,
            firstName: fname.value,
            lastName: lname.value,
            dateOfBirth: dob.value,
            fullAddress: {
                address: addr.value,
                area: area.value,
                pinCode: pincode.value,
                cityName: city.value,
                stateName: state.value,
                country: country.value
            },
            gender: whatGender,
            isMarried: ismarrry,
        }
        // adding this user detail to array
        userArray.push(user);
        // clear the form
        clearForm();
        // for craeting table
        // userInfo(userArray);
        createLocalAray()

        selecetAll.classList.remove("disable");
        deleteAll.classList.remove("disable");
    }else{
        return
    }
}

// form validation function
function formValidation() {
    valid = true
    if ( fname.value == "") {
        alert("Enter First Name");
        valid = false;
    } else if (lname.value == "") {
        alert("Enter Last Name");
        valid = false;
    }else if (dob.value == "") {
        alert("Enter Date Of Birth");
        valid = false;
    }else if (addr.value == "") {
        alert("Enter Address");
        valid = false;
    }else if (area.value == "") {
        alert("Enter Area");
        valid = false;
    }else if (pincode.value == "") {
        alert("Enter Pincode");
        valid = false;
    }else if (country.value == "") {
        alert("Enter Country");
        valid = false;
    }else if (state.value == "" ) {
        alert("Enter State");
        valid = false;
    }else if (city.value == "") {
        alert("Enter City");
        valid = false;
    }else if (male.checked == false && female.checked == false && other.checked == false) {
        alert("select Gender");
        valid = false;
    }
    return valid;
}
// clear form 
function clearForm() {
    // reset form after submiting
    fname.value = "";
    lname.value = "";
    dob.value = "";
    addr.value = "";
    area.value = "";
    pincode.value = "";
    state.innerHTML = '<option value="">Enter State</option>';
    city.innerHTML = '<option value="">Enter City</option>';
    country.innerHTML = '<option value="">Enter Country</option>';
    // // contry select
    countryFun(Locations);
    // gender Reset
    if (male.checked == true) {
        male.checked = false;
    } else if (female.checked == true) {
        female.checked = false;
    } else if (other.checked == true) {
        other.checked = false;
    }
    // marrige statuts
    if (married.checked == true) {
        married.checked = false
    }
}
// craete user table function
function userInfo(formArray) {
    // craete Table menualy
    table.innerHTML = "";
    // let tr = "<tr>";
    formArray.map(function (value) {
        let tr = document.createElement("tr");

        let isSelTd = document.createElement("td");
        let isSelec = document.createElement("INPUT");
        isSelec.setAttribute("type", "checkbox");
        isSelec.setAttribute("name", "cheaker");
        if (value.isSeleceted == true)
            isSelec.setAttribute("checked", true);
        else
            isSelec.removeAttribute("checked");

        tr.appendChild(isSelTd);
        isSelTd.appendChild(isSelec);

        let idTd = document.createElement("td");
        idTd.innerHTML = value.id;
        tr.appendChild(idTd)

        let fnameTd = document.createElement("td");
        fnameTd.innerHTML = value.firstName;
        tr.appendChild(fnameTd);

        let LnameTd = document.createElement("td");
        LnameTd.innerHTML = value.lastName;
        tr.appendChild(LnameTd);

        let dobTd = document.createElement("td");
        dobTd.innerHTML = value.dateOfBirth;
        tr.appendChild(dobTd);

        let addresTd = document.createElement("td");
        addresTd.innerHTML = value.fullAddress.address + " " + value.fullAddress.area + "<br> " + value.fullAddress.pinCode + ", " +
            value.fullAddress.country + ", " + value.fullAddress.stateName + ", " + value.fullAddress.cityName;
        tr.appendChild(addresTd);

        let genderTd = document.createElement("td");
        genderTd.innerHTML = value.gender;
        tr.appendChild(genderTd);

        let mariTd = document.createElement("td");
        mariTd.innerHTML = value.isMarried;
        tr.appendChild(mariTd)

        let addDelTd = document.createElement("td");
        addDelTd.innerHTML = '<ul><li><button class="btn btn-info" onclick="editRow(' + value.id + ')"><i class="fas fa-user-edit"></i></button></li><li><button class="btn btn-danger"  onclick="deletRow(' + value.id + ')"><i class="fas fa-trash-alt"></i></button></li></ul>';
        tr.appendChild(addDelTd);

        table.appendChild(tr);
    });
}
// delet row and User Object in array
function deletRow(id) {
    if (!confirm("Are you sure you want to delete?")) return;
    let index = userArray.findIndex(x => x.id === id); //find index no. of this id
    userArray.splice(index, 1); // wher from and how many want to delet

    createLocalAray()

    if (userArray.length == 0) {
        selecetAll.classList.add("disable");
        deleteAll.classList.add("disable");
    }
}
// edit user object
function editRow(id) {
    let index = userArray.findIndex(x => x.id === id); //find index no. of this id
    let editUser = userArray[index]; // on click that indexs row get in varable
    editFun(editUser);
    editBtn.classList.remove("disable");
}
// get object and edit value and update
function editFun(editObj) {
    let stateVal = Locations[editObj.fullAddress.country];
    state.length = 1; // reset selecet
    city.length = 1; // reset selecet
    stateVal && stateFun(stateVal);
    let cityVal = stateVal[editObj.fullAddress.stateName];
    city.length = 1; // reset selecet
    cityVal && cityFun(cityVal);
    // form value 
    fname.value = editObj.firstName;
    lname.value = editObj.lastName;
    dob.value = editObj.dateOfBirth;
    addr.value = editObj.fullAddress.address;
    area.value = editObj.fullAddress.area;
    pincode.value = editObj.fullAddress.pinCode;
    country.value = editObj.fullAddress.country;
    state.value = editObj.fullAddress.stateName;
    city.value = editObj.fullAddress.cityName;
    // gender selector
    if (whatGender == "Male") {
        male.checked = true;
    } else if (whatGender == "Female") {
        female.checked = true;
    } else if (whatGender == "Other") {
        other.checked = true;
    }
    // Radio as user defined
    if (editObj.isMarried == "Married") {
        married.checked = true;
    } else if (editObj.isMarried == "Unmarried") {
        married.checked = false;
    }
    submitBtn.classList.add("disable");
    editBtn.onclick = function () {
        UpdateTab(editObj)

        createLocalAray()
    }
}
function UpdateTab(editObj) {
    editObj.firstName = fname.value;
    editObj.lastName = lname.value;
    editObj.dateOfBirth = dob.value;
    let editAdd = editObj.fullAddress
    Object.keys(editAdd).map(function () {
        editAdd.address = addr.value
        editAdd.area = area.value
        editAdd.pinCode = pincode.value
        editAdd.country = country.value
        editAdd.stateName = state.value
        editAdd.cityName = city.value
    })
    if (male.checked == true) {
        whatGender = "Male";
    } else if (female.checked == true) {
        whatGender = "Female";
    } else if (other.checked == true) {
        whatGender = "Other";
    }
    // Radio as user defined
    if (married.checked == true) {
        editObj.isMarried = "Married";
    } else if (married.checked == false) {
        editObj.isMarried = "Unmarried";
    }
    editObj.gender = whatGender;
    // clear the form and update
    submitBtn.classList.remove("disable");
    editBtn.classList.add("disable");
    clearForm();
}
deselctall.style.display = "none";
// select all cheakbox
selecetAll.onclick = function () {
    selectallFun();
    deselctall.style.display = "block";
    selecetAll.style.display = "none";
}
// deselect all cheakbox
deselctall.onclick = function () {
    deselectallFun();
    selecetAll.style.display = "block";
    deselctall.style.display = "none";
}
// select all cheakbox function
function selectallFun() {
    userArray = userArray.map((user) => {
        user.isSeleceted = true;
        return user;
    })
    userInfo(userArray);
}
// deselect all cheakbox
function deselectallFun() {
    userArray = userArray.map((user) => {
        user.isSeleceted = false;
        return user;
    })

    createLocalAray()
}
// delete user data function
let selecUser;
function deletSelected() {
    // table cheackes checke box
    let UserChekArry = document.querySelectorAll("input[name='cheaker']:checked");
    // table all checke box
    selecUser = document.querySelectorAll("input[name='cheaker']");
    
    if (UserChekArry.length == 0) {
        alert("Select First");
    }else {
         let ans = confirm("Are You Sure Want to delete");
         if (ans == true) {
             // upfate user array if chekd
             Object.keys(selecUser).map((x, i) => {
                 if (selecUser[x].checked) {
                     userArray[i].isSeleceted = true;
                 }
             });
 
             const tempArr = userArray.filter((e) => !e.isSeleceted);
             userArray = tempArr;
 
             deselctall.style.display = "none";
             selecetAll.style.display = "block";
         }
     }
     if (userArray.length == 0) {
        selecetAll.classList.add("disable");
        deleteAll.classList.add("disable");
    }

    createLocalAray()
}

function createLocalAray(){
    // userInfo(userArray); // updates user array print on table
    localStorage.setItem("keys",JSON.stringify(userArray));
    let localUserArry = localStorage.getItem("keys");
    userInfo(JSON.parse(localUserArry))
    userArray = JSON.parse(localUserArry);
}

window.onload = () => {
    let localUserArry = localStorage.getItem("keys");
    userInfo(JSON.parse(localUserArry))
    userArray = JSON.parse(localUserArry);
    if (userArray.length == 0) {
        selecetAll.classList.add("disable");
        deleteAll.classList.add("disable");
    }else{
        selecetAll.classList.remove("disable");
        deleteAll.classList.remove("disable");
    }
}

setTimeout(function(){
    if(document.cookie.length == 0){
        window.location.assign("https://therajamancha.github.io/crud-website//login.html");
        // window.location.assign("https://rajamanchacrud.netlify.app/login.html");
    }
},500);

let logout = document.querySelector("#logout");
logout.onclick = function(e){
    e.preventDefault();
    document.cookie.length == 0;
    document.cookie.length = 0;
}

const userCook = JSON.parse(document.cookie);
let userName = userCook.name
let userNav = document.querySelector('#user-info');
userNav.innerHTML = userName;