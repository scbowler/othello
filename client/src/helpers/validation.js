export function validateLogin(login){
    let counter = 0;
    let { form } = login.state;
    let errorObj = {};
    if (form.email !== userEmail){
        errorObj.email = "Invalid email";
    }
    if (form.password !== userPassword) {
        errorObj.password = "Invalid password";
    }
    
    if (Object.keys(errorObj).length > 0){
        return errorObj;
    }

    for (let field in form){
        if (field !== ""){ 
            counter++;
        }
        if (counter == Object.keys(form).length){ 
            return true; 
        }
    }
};

export function validateSignup(signup){
    let counter = 0;
    let { form } = signup.state;
    let errorObj = {};
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
    if (form.email.search(emailRegex) == -1){
        errorObj.email = "Please enter a valid email";
    }
    if (form.username.length < 4){
        errorObj.username = "Please enter a username with 4 or more characters";
    }
    if (form.password.search(passwordRegex) == -1){
        errorObj.passwordStrength = "Please enter a stronger password";
    }
    if (form.password !== form.verifyPw){
        errorObj.passwordVerification = "Passwords do not match";
    }
    
    if (Object.keys(errorObj).length > 0){
        return errorObj;
    }

    for (let field in form){
        if (field !== ""){
            counter++;
        }
        if (counter == Object.keys(form).length){ 
            return true; 
        }
    }
}
