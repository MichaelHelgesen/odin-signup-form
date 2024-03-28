const passwordFields = document.querySelectorAll("input[type=password]");
const submitButton = document.querySelector("button");
const allInputFields = Array.from(document.querySelectorAll("input"));
const form = document.querySelector("form");

let password = ""
let passwordConfirm = ""
const patternLetters = /[a-zA-Z]/
const patternNumbers = /[0-9]/
const patternSymbol = /[!+#&/()-]/

const checkValidPasswordKey = function(keypress) {
    
    //const pattern = /^[a-zA-Z0–9!#&/()-_]+$/; 
    if (keypress.key.length === 1) {
        if (patternLetters.test(keypress.key) ||
            patternNumbers.test(keypress.key) ||
            patternSymbol.test(keypress.key)
        ) {
            console.log("Pattern", patternSymbol.test(keypress.key))
            console.log("Number", patternNumbers.test(keypress.key))
            console.log("Letter", patternLetters.test(keypress.key))
            return true
        }
    }
    
    if (
        keypress.keyCode >= 37 && keypress.keyCode <= 40 || // Arrow keys
        keypress.keyCode === 8 || // backspace
        keypress.keyCode === 9 ||// tab
        keypress.keyCode === 13 // enter
        //keypress.keyCode === 189 // -
    ) {
        return true
    }
    if (!keypress.shiftKey) {
        if (
            keypress.keyCode === 35 || // End
            keypress.keyCode === 36 || // Home 
            keypress.keyCode === 46  // Del 
            /* keypress.keyCode === 107 || // Numpad /
            keypress.keyCode === 109 || // Numpad -
            keypress.keyCode === 111 // Numpad + */
        ) {
            return true
        }           
    }
}

const checkValidPasswordString = function(passwordString) {
    return patternLetters.test(passwordString) && patternNumbers.test(passwordString) && patternSymbol.test(passwordString)
}

const inputSave = function(e) {
    if(checkValidPasswordKey(e)) {
        console.log("VALID")
        if (e.target.id === "password") {
            password = e.target.value;
            if(e.type === "keyup") {
                console.log(password)
                if (password.length > 5) {
                    if (checkValidPasswordString(password)) {
                        e.target.setCustomValidity("")
                    } else {
                        e.target.setCustomValidity("Wrong formatting")
                    }
                }
            }
        } else {
            if(e.key.length === 1 || e.keyCode == 8 || e.keyCode == 46) {
                e.target.setCustomValidity("")
            }
            passwordConfirm = e.target.value;
        }
    } else {
        console.log("forbidden")
        e.preventDefault();
        //document.querySelector(".password-error-msg").textContent = "error"
    }
    //console.log(e)
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
passwordFields.forEach(input => input.addEventListener("keyup", inputSave))
submitButton.addEventListener("click", checkMatchingPasswords)
form.addEventListener("submit", (ev) => ev.preventDefault())