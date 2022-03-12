validate = (input) => {
    if(input.value === ""){
        input.classList.add("is-invalid")
    }
    else{
        input.classList.remove("is-invalid")
    }
}


$("#loginbtn").on("click",(e)=> {
    e.preventDefault()
    let form = $("form")[0]
    let inputs = $("form input");
    $.each(inputs,(i,input) => {
        validate(input)
    })


    if(form.checkValidity()){
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
                    localStorage.setItem('authenicatedUser',response.data);
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