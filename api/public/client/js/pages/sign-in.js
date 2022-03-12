
$("#loginbtn").on("click",()=> {
    const email = $("#email").val();
    const password = $("#password").val();
    if(email === "" && password === "" ){
        alert("email and password required")
    }
    else{
        $.ajax({
            url:"https://betchat-backend-test.herokuapp.com/api/auth/sign-in",
            method: "post",
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