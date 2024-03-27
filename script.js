const passwordFields = document.querySelectorAll("input[type=password]");
const submitButton = document.querySelector("button");
const allInputFields = Array.from(document.querySelectorAll("input"));
const form = document.querySelector("form");

let password = ""
let passwordConfirm = ""

const inputSave = function(e) {
    const letterNumber = /^[0-9a-zA-Z]+$/;
    if(e.target.value.match(letterNumber)) {
        e.target.setCustomValidity("")
        if (e.target.id === "password") {
            password = e.target.value;
        } else {
            passwordConfirm = e.target.value;
        }
    }
}

const checkMatchingPasswords = function(e) {
    validFields = true;
    allInputFields.forEach(el => {
        if (!el.validity.valid) {
            validFields = false;
            return;
        }
    });
    if (validFields) {
        if (password && password == passwordConfirm) {
            console.log("same pass")
        }  else {
            document.getElementById("password-confirm").setCustomValidity("Password doesn't match")
        }
    }
}

passwordFields.forEach(input => input.addEventListener("keydown", inputSave))
submitButton.addEventListener("click", checkMatchingPasswords)
form.addEventListener("submit", (ev) => ev.preventDefault())