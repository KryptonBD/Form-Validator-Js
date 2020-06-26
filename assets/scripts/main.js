const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//Input Error Styles and Messages
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.classList.add("error");
    formControl.classList.remove("success");
    const small = formControl.querySelector("small");
    small.innerText = message;
}

//Input Success Styles and Messages
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.classList.remove("error");
    formControl.classList.add("success");
}

//Check Field Requirement
function checkRequired(inputArr) {
    inputArr.forEach(input => {
        if (input.value.trim() == "") {
            showError(input, `${getFieldName(input)} Field Required`);
        } else {
            showSuccess(input);
        }
    })
}


//Checking Lengths
function checkLengthOfField(inputArr) {
    inputArr.forEach(inputObj => {
        if (inputObj.input.value.length < inputObj.min) {
            showError(inputObj.input, `${getFieldName(inputObj.input)} must be at least ${inputObj.min} characters`);
        } else if (inputObj.input.value.length > inputObj.max) {
            showError(inputObj.input, `${getFieldName(inputObj.input)} must be less than ${inputObj.max} characters`);
        } else {
            showSuccess(inputObj.input);
        }
    })
}

//Email Validation
function checkEmailValid(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // return re.test(String(email).toLowerCase());
    if(re.test(input.value.toLowerCase())) {
        showSuccess(input);
    } else {
        showError(input, "Please Enter Valid Email");
    }
}

//Check Password Field
function checkPasswordMatch(input1, input2) {
    if(input1.value != input2.value) {
        showError(input2, "Passwords do not match");
    }
}

//Get Field Name
function getFieldName(input) {
    let i = input.id.charAt(0).toUpperCase() + input.id.slice(1);

    return i == "Password2" ? "Password" : i;
}

//On form Submission
form.addEventListener("submit", e => {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLengthOfField([{input: username, min: 3, max: 15}, {input: password, min: 6, max: 25}]);
    checkEmailValid(email);
    checkPasswordMatch(password, password2);
})