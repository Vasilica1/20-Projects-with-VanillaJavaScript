const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.classList.add('error');
    const small = formControl.querySelector('small');
    small.innerHTML = message;
}   

//show success outline 
function showSuccess(input1) {
    const successChange = input1.parentElement;
    successChange.className = 'form-control success';
}

// check email is valid 
const validateEmail = (input) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, "Email is not valid")
    }
  };

//check password match 

function passwordMatch(firstPassword, secondPassword) {
    if(firstPassword.value !== secondPassword.value) {
        showError(secondPassword, "Passwords do not match");
    }
}

//check required fields 
function checkRequired(inputArr) {
    inputArr.forEach(element => {
        if(element.value.trim() == '') {
            showError(element, `${getFieldName1(element)} is required`);
        } else {
            showSuccess(element);
        }
    });
}
//get first letter

function getFieldName1(value) {
    const valueId = value.id[0].toUpperCase() + value.id.slice(1);
    return valueId;
}

//check the length of the values inserted in inputs 

function checkLength(input, minValue, maxValue) {
    if(input.value.length < minValue) {
        showError(input, `${getFieldName1(input)} must be at least ${minValue} characters`);
    } else if(input.value.length > maxValue) {
        showError(input, `${getFieldName1(input)} must be less than ${maxValue} characters`);
    } else {
        showSuccess(input);
    }
}

//event listeners
form.addEventListener('submit', function(e){
    e.preventDefault();
    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    validateEmail(email);
    passwordMatch(password, password2);
})
