
$("#loginbtn").on("click",(e)=> {
    e.preventDefault()
    e.target.innerText = "Authenticating..."

    const email = $("#email").val();
    const password = $("#password").val();
    if(email === "" && password === "" ){
        alert("email and password required")
    }
    else{
        $.ajax({
            url:"https://betchat-backend-test.herokuapp.com/api/auth/sign-in",
            type: "POST",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ email: email, password: password }),
            success: response => {
                if(response.success){
                    alert("Login success")
                }
                else{
                    alert("Login failed")
                }
                e.target.innerText = "Sign in"
            },
            error: err => {
                alert("Auth failed");
                e.target.innerText = "Sign in"
            },
        })
    }
 
});