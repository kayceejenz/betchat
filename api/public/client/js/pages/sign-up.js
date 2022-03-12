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

$("#signupbtn").on("click",(e)=> {

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
        e.target.innerText = "Signing up..."

        const fullname = $("#fullname").val()
        const email = $("#email").val()
        const password = $("#password").val()
        const phonenumber = $("#phonenumber").val()
        const interests = $("#interests").val().split(',')
    
        const payload = {
            fullname: fullname,
            email: email,
            phonenumber: phonenumber,
            interests: interests,
            password: password
        }
    
            $.ajax({
                url:"https://betchat-backend-test.herokuapp.com/api/auth/sign-up",
                type: "POST",
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(payload),
                success: response => {
                    if(response.success){
                        toastr.success(response.message)
                        location.href = "https://betchat-backend-test.herokuapp.com/auth/sign-in"
                    }
                    e.target.innerText = "Sign up"
                },
                error: err => {
                    toastr.error("Sign up failed")
                    e.target.innerText = "Sign up"
                },
            })
    }
   
 
});