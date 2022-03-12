
$("#loginbtn").on("click",(e)=> {
    e.preventDefault()

    const email = $("#email").val();
    const password = $("#password").val();
    if(email === "" && password === "" ){
        alert("email and password required")
    }
    else{
        $.ajax({
            url:"http://localhost:45831/api/auth/sign-in",
            method: "post",
            dataType: "json",
            contentType: "application/json",
            data: { email: email, password: password },
            success: response => {
                alert("here")
                !response.success ? alert("Auth failed") : alert(response.message)
    
            },
            error: err => {
                alert("An error occurred");
            }
        })
    }
 
});