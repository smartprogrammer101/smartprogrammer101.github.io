(function() {
    // document.forms[0].addEventListener("submit", postdata);
    // function postdata(e) {
    //     e.preventDefault();
    //     const username = document.getElementById("username")
    //     const room_id = document.getElementById("room_id")
    //     const message = document.getElementById("message")
    //     const xhr = new XMLHttpRequest();
    //     const data = {
    //         username: username.value,
    //         room_id: room_id.value,
    //         message: message.value,
    //         "csrfmiddlewaretoken": $("input[name=csrfmiddlewaretoken]").val()
    //     };
        
    //     xhr.open("POST", "/send", true);
    //     xhr.setRequestHeader('Content-type', 'application/json');
    //     xhr.onreadystatechange = function() {
    //         if (xhr.status == 200 && xhr.readyState == 4) {
    //             alert("sent")
    //         }
    //     }
    //     xhr.send(JSON.stringify(data))
    //     message.value = '';
    // }
})();

$(document).on("submit", "form", function(e) {
    e.preventDefault();

    $.ajax({
        type: "POST",
        url: "/send",
        data: {
            username: $("#username").val(),
            room_id: $("#room_id").val(),
            message: $("#message").val(),
            "csrfmiddlewaretoken": $("input[name=csrfmiddlewaretoken]").val()
        },
        success: function(data) {
            // alert(data)
        }
    });
    document.getElementById("message").value = '';
})

setInterval(function() {
    $.ajax({
        type: "GET",
        url: `/getMessages/${document.querySelector("section").textContent}`,
        success: function(response) {
            console.log(response.messages);
            $(".container").empty();
            for (const key in response.messages) {
                const temp = 
                `<div class="message">
                    <h3>${response.messages[key].user}</h3>
                    <p class="para">${response.messages[key].value}</p>
                    <p class="date">${response.messages[key].date}</p>
                </div>`;
            $(".container").append(temp);
            }
        },
        error: function(response) {
            console.log(response.messages);
            alert("An error occurred")
        }
    });
}, 1000)