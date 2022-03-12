$(function(){
    const authenicatedUser = localStorage.getItem("authenicatedUser");
    console.log(authenicatedUser)
    const message = `Welcome ${authenicatedUser.fullname}, see feed posts by most recent`
    $("#message").html(message)
    $("#dropdownMenuButton").html(authenicatedUser.fullname)
})

$("#logout").on("click", () => {
    localStorage.removeItem("authenicatedUser")
    location.href = "https://betchat-backend-test.herokuapp.com/auth/sign-in"
})