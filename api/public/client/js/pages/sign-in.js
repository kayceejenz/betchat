validate = (input) => {
    if(input.value === ""){
        input.classList.add("is-invalid")
        return false
    }
    else{
        input.classList.remove("is-invalid")
        return true
    }
}

passValidate = (status) => {
    return status ? true : false
}


$("#loginbtn").on("click",(e)=> {
    e.preventDefault()
    let form = $("form")[0]
    let inputs = $("form input");
    let isAllValid = false;
    let validStates = []
    $.each(inputs,(i,input) => {
        validStates.push(validate(input))
    })
    isAllValid = validStates.every(passValidate)


    if(isAllValid){
        e.target.innerText = "Authenticating..."

        const email = $("#email").val()
        const password = $("#password").val()

        $.ajax({
            url:"https://betchat-backend-test.herokuapp.com/api/auth/sign-in",
            type: "POST",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ email: email, password: password }),
            success: response => {
                if(response.success){
                    toastr.success("Login successful.")
                    localStorage.setItem('authenicatedUser',JSON.stringify(response.data))
                    location.href = "https://betchat-backend-test.herokuapp.com/feeds/index"
                }
                e.target.innerText = "Sign in"
            },
            error: err => {
                toastr.error("Auth failed")
                e.target.innerText = "Sign in"
            },
        })
    }
     
});