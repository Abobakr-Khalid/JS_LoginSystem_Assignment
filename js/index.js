


// =========================================SIGN-UP Section=========================================


let nameInput = document.querySelector('#userName');
let emailInput = document.querySelector('#userEmail');
let passwordInput = document.querySelector('#userPassword');

let signUpBtn = document.querySelector('#signUpBtn');

let allUsers = [];

if (localStorage.getItem('users') != null)
    allUsers = JSON.parse(localStorage.getItem('users'));



function addUser() {

    if (inputsValidation(nameInput) && inputsValidation(emailInput) && inputsValidation(passwordInput) && !emailExistence()) {
        let user = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        };

        allUsers.push(user);
        localStorage.setItem('users', JSON.stringify(allUsers));
        clearForm();
        Swal.fire({
            position: "centre",
            icon: "success",
            title: "Signed up Successfully",
            showConfirmButton: false,
            timer: 1500
        });
        setTimeout(function () {
            window.open('index.html', '_self');
        }, 2000)
    }
    else if (!inputsValidation(nameInput)) {
        Swal.fire({
            icon: "error",
            title: "INVALID...",
            text: "Name must be 4 characters or more"
        });
    }
    else if (!inputsValidation(emailInput)) {
        Swal.fire({
            icon: "error",
            title: "INVALID...",
            text: "Enter a valid email"
        });
    }
    else if (!inputsValidation(passwordInput)) {
        Swal.fire({
            icon: "error",
            title: "INVALID...",
            text: "Password must be 8 characters/symbols or more"
        });
    }
    else if (emailExistence()) {
        Swal.fire({
            icon: "error",
            title: "INVALID...",
            text: "Email already exists"
        });
    }
}

function clearForm() {
    nameInput.value = null;
    emailInput.value = null;
    passwordInput.value = null;
}


function inputsValidation(input) {
    let regex = {
        userName: /[A-Z]{3,}/i,
        userEmail: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        userPassword: /^[\s\S]{8,}$/
    }
    if (regex[input.id].test(input.value))
        return true;
    return false;
}

function emailExistence() {
    for (let i = 0; i < allUsers.length; i++) {
        if (emailInput.value.toLowerCase() === allUsers[i].email.toLowerCase())
            return true;
    }
    return false;
}

if (signUpBtn) {
    signUpBtn.addEventListener('click', function () {
        addUser();
    });
}

// =========================================LOGIN Section=========================================

let signInBtn = document.querySelector('#signInBtn');
let validEmail = false;
let validPassword = false;
let loggedInUser = '';

function signIn() {
    for (let i = 0; i < allUsers.length; i++) {
        if (emailInput.value == allUsers[i].email && passwordInput.value == allUsers[i].password) {
            validEmail = true;
            validPassword = true;
            loggedInUser = allUsers[i].name;
        }
    }

    if (validEmail && validPassword) {
        localStorage.setItem('loggedInUser', loggedInUser);
        emailInput.value = null;
        passwordInput.value = null;
        window.open('home.html', '_blank');
    }
    else if (!validEmail) {
        Swal.fire({
            icon: "error",
            title: "INVALID...",
            text: "Invalid Login: check email or password"
        });
    }
    else if (!validPassword) {
        Swal.fire({
            icon: "error",
            title: "INVALID...",
            text: "Password does not match this email"
        });
    }
}


if (signInBtn) {
    signInBtn.addEventListener('click', function () {
        signIn();
    });
}




// =========================================HOME Section=========================================
 

let welcomeMsg = document.querySelector('#welcomeMsg');

if (welcomeMsg) {
    loggedInUser = localStorage.getItem('loggedInUser');
    welcomeMsg.innerHTML += `${loggedInUser}`
}