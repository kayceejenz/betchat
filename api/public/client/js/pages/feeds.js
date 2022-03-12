$(function(){
    const serializedObject = localStorage.getItem("authenicatedUser");
    const authenicatedUser = JSON.parse(serializedObject)

    const message = `Welcome ${authenicatedUser.fullname}, see feed posts by most recent`
    $("#dropdown01").html(authenicatedUser.fullname)
})

$("#logout").on("click", () => {
    localStorage.removeItem("authenicatedUser")
    location.href = "https://betchat-backend-test.herokuapp.com/auth/sign-in"
})