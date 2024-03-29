const passwordFields = document.querySelectorAll("input[type=password]");
const submitButton = document.querySelector("button");
const allInputFields = Array.from(document.querySelectorAll("input"));
const form = document.querySelector("form");
const passwordHelpSpan = document.querySelector(".password-msg")
const passwordHelpSpanLetters = document.querySelector(".psw-letters .symbol")
const passwordHelpSpanNumbers = document.querySelector(".psw-numbers .symbol")
const passwordHelpSpanSymbols = document.querySelector(".psw-symbols .symbol")
const passwordHelpSpanChar = document.querySelector(".psw-char .symbol")
let password = ""
let passwordConfirm = ""
const patternLetters = /[a-zA-Z]/
const patternNumbers = /[0-9]/
const patternSymbol = /[!+#&/()-]/
let passwordHelpLetters = "<span class='psw psw-letters red'>Letters(a-zA-Z): <span>🗙</span></span>"
let passwordHelpNumbers = "<span class='psw psw-numbers red'>Numbers(0-9): <span>🗙</span></span>"
let passwordHelpSymbol = "<span class='psw psw-symbols red'>Symbols(!+#&/()-): <span>🗙</span></span>"
let passwordHelpRange = "<span class='psw psw-char red'>Characters(8-16): <span>🗙</span></span>"


const checkValidPasswordKey = function (keypress) {
    if (keypress.key.length === 1) {
        if (patternLetters.test(keypress.key)
        ) {
            console.log("Letter", patternLetters.test(keypress.key))
            passwordHelpLetters = "<span class='psw psw-letters green'>Letters(a-zA-Z): <span>✓</span></span>"
            console.log(passwordHelpSpanLetters)
            if (keypress.type === "keyup") {
                passwordHelpSpanLetters.innerText = "✓"
                passwordHelpSpanLetters.classList.remove("red")
            }
            return true
        }
        if (patternNumbers.test(keypress.key)
        ) {
            console.log("Number", patternNumbers.test(keypress.key))
            if (keypress.type === "keyup") {
                passwordHelpSpanNumbers.innerText = "✓"
                passwordHelpSpanNumbers.classList.remove("red")
            }
            //passwordHelpNumbers = "<span class='psw psw-numbers green'>Numbers(0-9): <span>✓</span></span>"
            return true
        }
        if (patternSymbol.test(keypress.key)
        ) {
            console.log("Symbol", patternSymbol.test(keypress.key))
            if (keypress.type === "keyup") {
                passwordHelpSpanSymbols.innerText = "✓"
                passwordHelpSpanSymbols.classList.remove("red")
            }
            //passwordHelpSymbol = "<span class='psw psw-symbols green'>Symbols(!+#&/()-): <span>✓</span></span>"
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

const checkValidPasswordString = function (passwordString) {
    return patternLetters.test(passwordString) && patternNumbers.test(passwordString) && patternSymbol.test(passwordString)
}

const inputSave = function (e) {
    console.log(e)
    if (checkValidPasswordKey(e)) {
        console.log("VALID")

        if (e.target.id === "password") {
            password = e.target.value;

            if (e.type === "keyup") {
                if (!patternLetters.test(password)
                ) {
                    passwordHelpSpanLetters.innerText = "🗙"
                    passwordHelpSpanLetters.classList.add("red")
                }
                if (!patternNumbers.test(password)
                ) {
                    passwordHelpSpanNumbers.innerText = "🗙"
                    passwordHelpSpanNumbers.classList.add("red")
                }
                if (!patternSymbol.test(password)
                ) {
                    passwordHelpSpanSymbols.innerText = "🗙"
                    passwordHelpSpanSymbols.classList.add("red")
                }
                //passwordHelpSpan.innerHTML = passwordHelpLetters + passwordHelpNumbers + passwordHelpSymbol + passwordHelpRange
                console.log(password.length)
                if (password.length >= 8) {
                    console.log("more than six")
                    //passwordHelpRange = "<span class='psw psw-char green'>Characters(8-16): <span>✓</span></span>"
                    passwordHelpSpanChar.innerText = "✓"
                    passwordHelpSpanChar.classList.remove("red")
                    if (checkValidPasswordString(password)) {
                        e.target.setCustomValidity("")
                    } else {
                        e.target.setCustomValidity("Please use the correct formatting")
                    }
                } else {
                    passwordHelpSpanChar.innerText = "🗙"
                    passwordHelpSpanChar.classList.add("red")
                    //passwordHelpRange = "<span class='psw psw-char red'>Characters(8-16): <span>🗙</span></span>"
                    //passwordHelpSpan.innerHTML = passwordHelpLetters + passwordHelpNumbers + passwordHelpSymbol + passwordHelpRange

                }
            }
        } else {
            if (e.key.length === 1 || e.keyCode == 8 || e.keyCode == 46) {
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

const checkMatchingPasswords = function (e) {
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
        } else {
            document.getElementById("password-confirm").setCustomValidity("Password doesn't match")
        }
    }
}
passwordFields.forEach(input => input.addEventListener("keydown", inputSave))
passwordFields.forEach(input => input.addEventListener("keyup", inputSave))
submitButton.addEventListener("click", checkMatchingPasswords)
form.addEventListener("submit", (ev) => ev.preventDefault())