let authenicatedUser = {}
$(function(){
    const serializedObject = localStorage.getItem("authenicatedUser");
    authenicatedUser = JSON.parse(serializedObject)

    const message = `Welcome ${authenicatedUser.fullname}, see feed posts by most recent`
    $("#dropdown01").html(authenicatedUser.fullname)

    getFeeds()
})

$("#logout").on("click", () => {
    localStorage.removeItem("authenicatedUser")
    location.href = "https://betchat-backend-test.herokuapp.com/auth/sign-in"
})

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

getFeeds = () =>{
    $("#loader").show()
    $.ajax({
        url:"https://betchat-backend-test.herokuapp.com/api/feeds/",
        headers: {authorization: `Bearer ${authenicatedUser.token}`},
        type: "GET",
        success: response => {
            if(response.success){
                $("#content").empty()
                $.each(response.data,(i,feed) => {
                    const  template = `
                    <div class="col-md-12">
                    <div class="feed p-2">
                        <div class="bg-white border mt-2">
                            <div>
                                <div class="d-flex flex-row justify-content-between align-items-center p-2 border-bottom">
                                    <div class="d-flex flex-row align-items-center feed-text px-2"><img class="rounded-circle" src="${response.data.postedBy.image}" width="45">
                                        <div class="d-flex flex-column flex-wrap ml-2"><span class="font-weight-bold">${response.data.postedBy.fullname}</span><span class="text-black-50 time">${new Date(response.data.createdAt).toLocaleDateString()} ${new Date(response.data.createdAt).toLocaleTimeString()}</span></div>
                                    </div>
                                    <div class="feed-icon px-2"><i class="fa fa-ellipsis-v text-black-50"></i></div>
                                </div>
                            </div>
                            <div class="p-2 px-3"><h5>${response.data.title}</h5></div>
                            <div class="p-2 px-3"><span>${response.data.body}</span></div>
                            <div class="d-flex justify-content-end socials p-2 py-3"><i class="fa fa-thumbs-up"></i><i class="fa fa-comments-o"></i><i class="fa fa-share"></i></div>
                        </div>
                    </div>
                  </div>
                    `
                    $("#content").append(template)
                })
            }
            $("#loader").hide()
        },
        error: err => {
            toastr.error("Error while fetching feeds")
            $("#loader").hide()
        },
    })}

    $("#postbtn").on("click",(e)=> {

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
            e.target.innerText = "Posting..."
    
            const title = $("#title").val()
            const body = $("#body").val()
        
            const payload = {
                title: title,
                body: body,
            }
        
                $.ajax({
                    url:"https://betchat-backend-test.herokuapp.com/api/feeds/",
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json;charset=utf-8",
                    headers: {authorization: `Bearer ${authenicatedUser.token}`},
                    data: JSON.stringify(payload),
                    success: response => {
                        if(response.success){
                            toastr.success(response.message)
                            const  template = `
                            <div class="col-md-12">
                                <div class="feed p-2">
                                    <div class="bg-white border mt-2">
                                        <div>
                                            <div class="d-flex flex-row justify-content-between align-items-center p-2 border-bottom">
                                                <div class="d-flex flex-row align-items-center feed-text px-2"><img class="rounded-circle" src="${response.data.postedBy.image}" width="45">
                                                    <div class="d-flex flex-column flex-wrap ml-2"><span class="font-weight-bold">${response.data.postedBy.fullname}</span><span class="text-black-50 time">${new Date(response.data.createdAt).toLocaleDateString()} ${new Date(response.data.createdAt).toLocaleTimeString()}</span></div>
                                                </div>
                                                <div class="feed-icon px-2"><i class="fa fa-ellipsis-v text-black-50"></i></div>
                                            </div>
                                        </div>
                                        <div class="p-2 px-3"><h5>${response.data.title}</h5></div>
                                        <div class="p-2 px-3"><span>${response.data.body}</span></div>
                                        <div class="d-flex justify-content-end socials p-2 py-3"><i class="fa fa-thumbs-up"></i><i class="fa fa-comments-o"></i><i class="fa fa-share"></i></div>
                                    </div>
                                </div>
                            </div>
                            `
                            $("#content").prepend(template)
                        }
                        e.target.innerText = "Post"
                        $("#title").val("")
                        $("#body").val("")
                    },
                    error: err => {
                        toastr.error("Error occurred while posting")
                        e.target.innerText = "Post"
                    },
                })
        }
    })