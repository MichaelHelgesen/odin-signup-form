const passwordFields = document.querySelectorAll("input[type=password]");
const submitButton = document.querySelector("button");
const allInputFields = Array.from(document.querySelectorAll("input"));
const form = document.querySelector("form");
const passWordConfirmInput = document.getElementById("password-confirm");
const confirmationDiv = document.querySelector(".confirmation");
const passwordHelpSpan = document.querySelector(".password-msg");
const passwordHelpSpanLetters = document.querySelector(".psw-letters .symbol");
const passwordHelpSpanNumbers = document.querySelector(".psw-numbers .symbol");
const passwordHelpSpanSymbols = document.querySelector(".psw-symbols .symbol");
const passwordHelpSpanChar = document.querySelector(".psw-char .symbol");
const passwordConfirmHelpSpan = document.querySelector(".psw-match .symbol");
let password = "";
let passwordConfirm = "";
const patternLetters = /[a-zA-Z]/;
const patternNumbers = /[0-9]/;
const patternSymbol = /[!+#&/()-]/;
const setHelperTextSymbol = function (span, condition) {
    if (condition) {
        span.innerText = "✓";
        span.classList.remove("red");
    }
    else {
        span.innerText = "🗙";
        span.classList.add("red");
    }
};
const determineIfValidKeypress = function (keypress) {
    let validKey = false;
    if (keypress.key.length === 1) {
        if (keypress.type === "keyup") {
            if (patternLetters.test(keypress.key)) {
                setHelperTextSymbol(passwordHelpSpanLetters, true);
            }
            if (patternNumbers.test(keypress.key)) {
                setHelperTextSymbol(passwordHelpSpanNumbers, true);
            }
            if (patternSymbol.test(keypress.key)) {
                setHelperTextSymbol(passwordHelpSpanSymbols, true);
            }
        }
        validKey = true;
    }
    if (keypress.keyCode >= 37 && keypress.keyCode <= 40 || // Arrow keys
        keypress.keyCode === 8 || // backspace
        keypress.keyCode === 9 || // tab
        keypress.keyCode === 13 || // enter
        keypress.keyCode === 35 || // End
        keypress.keyCode === 36 || // Home 
        keypress.keyCode === 46 // Del 
    ) {
        validKey = true;
    }
    return validKey;
};
const checkValidPasswordString = function (passwordString) {
    return patternLetters.test(passwordString) && patternNumbers.test(passwordString) && patternSymbol.test(passwordString);
};
const inputSave = function (event) {
    if (determineIfValidKeypress(event)) {
        if (event.target.id === "password") {
            password = event.target.value;
            if (event.type === "keyup") {
                if (!patternLetters.test(password)) {
                    setHelperTextSymbol(passwordHelpSpanLetters, false);
                }
                if (!patternNumbers.test(password)) {
                    setHelperTextSymbol(passwordHelpSpanNumbers, false);
                }
                if (!patternSymbol.test(password)) {
                    setHelperTextSymbol(passwordHelpSpanSymbols, false);
                }
                // Check #password-confirm on change to #password
                if (password && password == passwordConfirm) {
                    passWordConfirmInput.setCustomValidity("");
                    setHelperTextSymbol(passwordConfirmHelpSpan, true);
                }
                else {
                    passWordConfirmInput.setCustomValidity("Please match your password");
                    setHelperTextSymbol(passwordConfirmHelpSpan, false);
                }
                if (password.length >= 8) {
                    setHelperTextSymbol(passwordHelpSpanChar, true);
                    if (checkValidPasswordString(password)) {
                        event.target.setCustomValidity("");
                    }
                    else {
                        event.target.setCustomValidity("Please use the correct formatting");
                    }
                }
                else {
                    setHelperTextSymbol(passwordHelpSpanChar, false);
                }
            }
        }
        else {
            passwordConfirm = event.target.value;
            if (event.type === "keyup") {
                if (password && password == passwordConfirm) {
                    event.target.setCustomValidity("");
                    setHelperTextSymbol(passwordConfirmHelpSpan, true);
                }
                else {
                    event.target.setCustomValidity("Please match your password");
                    setHelperTextSymbol(passwordConfirmHelpSpan, false);
                }
            }
        }
    }
    else {
        event.preventDefault();
    }
};
const checkMatchingPasswords = function () {
    let validFields = true;
    allInputFields.forEach(el => {
        if (!el.validity.valid) {
            validFields = false;
            return;
        }
    });
    if (validFields) {
        if (password && password == passwordConfirm) {
            confirmationDiv.style.display = "block";
        }
        else {
            passWordConfirmInput.setCustomValidity("Please match your password");
        }
    }
};
passwordFields.forEach(input => input.addEventListener("keydown", inputSave));
passwordFields.forEach(input => input.addEventListener("keyup", inputSave));
submitButton.addEventListener("click", checkMatchingPasswords);
form.addEventListener("submit", (ev) => ev.preventDefault());
