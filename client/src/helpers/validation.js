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
    
    if (errorObj > 0){
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
    return errorObj;
};

export function validateSignup(signup){
    let counter = 0;
    let { form } = signup.state;
    let errorObj = {};
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (form.email.search(emailRegex) == -1){
        errorObj.email = "Please enter a valid email";
    }
    if (form.password !== form.verifyPw){
        errorObj.password = "Passwords do not match";
    }
    if (form.username.length < 4){
        errorObj.username = "Please enter a username with 4 or more characters";
    }
    if (errorObj > 0){
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
