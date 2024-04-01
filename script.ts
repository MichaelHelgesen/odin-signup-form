const passwordFields = document.querySelectorAll("input[type=password]") as NodeListOf<HTMLFormElement>;
const submitButton = document.querySelector("button") as HTMLButtonElement;
const allInputFields = Array.from(document.querySelectorAll("input")) as Array<HTMLInputElement>;
const form = document.querySelector("form") as HTMLFormElement;
const passWordConfirmInput = document.getElementById("password-confirm") as HTMLInputElement;
const confirmationDiv = document.querySelector(".confirmation") as HTMLDivElement;
const passwordHelpSpan = document.querySelector(".password-msg") as HTMLSpanElement;
const passwordHelpSpanLetters = document.querySelector(".psw-letters .symbol") as HTMLSpanElement;
const passwordHelpSpanNumbers = document.querySelector(".psw-numbers .symbol") as HTMLSpanElement;
const passwordHelpSpanSymbols = document.querySelector(".psw-symbols .symbol") as HTMLSpanElement;
const passwordHelpSpanChar = document.querySelector(".psw-char .symbol") as HTMLSpanElement;
const passwordConfirmHelpSpan = document.querySelector(".psw-match .symbol") as HTMLSpanElement;
let password: string = "";
let passwordConfirm: string = "";
const patternLetters: RegExp = /[a-zA-Z]/;
const patternNumbers: RegExp = /[0-9]/;
const patternSymbol: RegExp = /[!+#&/()-]/;

const setHelperTextSymbol = function (span: HTMLSpanElement, condition: boolean): void {
    if (condition) {
        span.innerText = "✓"
        span.classList.remove("red")
    } else {
        span.innerText = "🗙"
        span.classList.add("red")
    }
}
const determineIfValidKeypress = function (keypress: KeyboardEvent): boolean {
    let validKey = false;
    if (keypress.key.length === 1) {
        if (keypress.type === "keyup") {
            if (patternLetters.test(keypress.key)) {
                setHelperTextSymbol(passwordHelpSpanLetters as HTMLSpanElement, true)
            }
            if (patternNumbers.test(keypress.key)) {
                setHelperTextSymbol(passwordHelpSpanNumbers as HTMLSpanElement, true)
            }
            if (patternSymbol.test(keypress.key)) {
                setHelperTextSymbol(passwordHelpSpanSymbols as HTMLSpanElement, true)
            }
        }
        validKey = true
    }
    if (
        keypress.keyCode >= 37 && keypress.keyCode <= 40 || // Arrow keys
        keypress.keyCode === 8 || // backspace
        keypress.keyCode === 9 ||// tab
        keypress.keyCode === 13 ||// enter
        keypress.keyCode === 35 || // End
        keypress.keyCode === 36 || // Home 
        keypress.keyCode === 46  // Del 
    ) {
        validKey = true
    }
    return validKey;
}

const checkValidPasswordString = function (passwordString: string): boolean {
    return patternLetters.test(passwordString) && patternNumbers.test(passwordString) && patternSymbol.test(passwordString)
}

const inputSave = function (event: Event): void {
    if (determineIfValidKeypress(event as KeyboardEvent)) {
        if ((event.target as HTMLInputElement).id === "password") {
            password = (event.target as HTMLInputElement).value;
            if (event.type === "keyup") {
                if (!patternLetters.test(password)
                ) {
                    setHelperTextSymbol(passwordHelpSpanLetters, false)
                }
                if (!patternNumbers.test(password)
                ) {
                    setHelperTextSymbol(passwordHelpSpanNumbers, false)
                }
                if (!patternSymbol.test(password)
                ) {
                    setHelperTextSymbol(passwordHelpSpanSymbols, false)
                }
                // Check #password-confirm on change to #password
                if (password && password == passwordConfirm) {
                    (passWordConfirmInput as HTMLInputElement).setCustomValidity("")
                    setHelperTextSymbol(passwordConfirmHelpSpan, true)
                } else {
                    (passWordConfirmInput as HTMLInputElement).setCustomValidity("Please match your password")
                    setHelperTextSymbol(passwordConfirmHelpSpan, false)
                }
                if (password.length >= 8) {
                    setHelperTextSymbol(passwordHelpSpanChar, true)
                    if (checkValidPasswordString(password)) {
                        (event.target as HTMLInputElement).setCustomValidity("")
                    } else {
                        (event.target as HTMLInputElement).setCustomValidity("Please use the correct formatting")
                    }
                } else {
                    setHelperTextSymbol(passwordHelpSpanChar, false)
                }
            }
        } else {
            passwordConfirm = (event.target as HTMLInputElement).value;
            if (event.type === "keyup") {
                if (password && password == passwordConfirm) {
                    (event.target as HTMLInputElement).setCustomValidity("")
                    setHelperTextSymbol(passwordConfirmHelpSpan, true)
                } else {
                    (event.target as HTMLInputElement).setCustomValidity("Please match your password")
                    setHelperTextSymbol(passwordConfirmHelpSpan, false)
                }
            }
        }
    } else {
        event.preventDefault();
    }
}

const checkMatchingPasswords = function (): void {
    let validFields = true;
    allInputFields.forEach(el => {
        if (!el.validity.valid) {
            validFields = false;
            return;
        }
    });
    if (validFields) {
        if (password && password == passwordConfirm) {
            (confirmationDiv as HTMLElement).style.display = "block"
        } else {
            (passWordConfirmInput as HTMLInputElement).setCustomValidity("Please match your password")
        }
    }
}
passwordFields.forEach(input => input.addEventListener("keydown", inputSave));
passwordFields.forEach(input => input.addEventListener("keyup", inputSave));
submitButton.addEventListener("click", checkMatchingPasswords);
form.addEventListener("submit", (ev) => ev.preventDefault());