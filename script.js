const passwordFields = document.querySelectorAll("input[type=password]");
const submitButton = document.querySelector("button");
const allInputFields = Array.from(document.querySelectorAll("input"));
const form = document.querySelector("form");

let password = ""
let passwordConfirm = ""

const checkValidPasswordKey = function(keypress) {
    // Refactor
    if (
        keypress.keyCode >= 65 && keypress.keyCode <= 90 || // a-z A-Z
        keypress.keyCode >= 37 && keypress.keyCode <= 40 || // Arrow keys
        keypress.keyCode === 8 || // backspace
        keypress.keyCode === 9 ||// tab
        keypress.keyCode === 189
    ) {
        return true
    }
    if (!keypress.shiftKey) {
        if (
            keypress.keyCode >= 48 && keypress.keyCode <= 57 ||
            keypress.keyCode >= 96 && keypress.keyCode <= 105 ||
            keypress.keyCode === 107 || // Numpad /
            keypress.keyCode === 109 || // Numpad-
            keypress.keyCode === 111 // Numpad +
        ) {
            return true
        }           
    } else {
        if (
            keypress.keyCode === 49 || // !
            keypress.keyCode === 51 || // #
            keypress.keyCode === 54 || // &
            keypress.keyCode === 55 // /
        ) {
            return true
        }
    }
}

const inputSave = function(e) {
    if(checkValidPasswordKey(e) || e.kodeCode === 9  ) {
        //document.querySelector(".password-error-msg").textContent = ""
        console.log("correct key")
    } else {
        e.preventDefault();
        //document.querySelector(".password-error-msg").textContent = "error"
    }
    console.log(e)
    const letterNumber = /^[0-9a-zA-Z]+$/;
    if(e.key.match(letterNumber)) {
        console.log("MATCH", e.key)
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