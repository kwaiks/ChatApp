var socket = io();

(function(){
    $("form").submit(function(e){
        e.preventDefault();
        socket.emit('chat message', $("#message").val())
        $("#message").val("")
        return true;
    })
})();

(function(){
    socket.on("received", data  =>  {
    let  li  =  document.createElement("li");
    let  span  =  document.createElement("span");
    var  messages  =  document.getElementById("messages");
    messages.appendChild(li).append(data.message);
    messages.appendChild(span).append("by "  +  "anonymous"  +  ": "  +  "just now");
    });
})

(function(){
    fetch("/chats")
    .then(data=>{
        return data.json();
    })
.then(json => {
    json.map(data=>{
        let li = document.createElement("li")
        let message = document.getElementById("messages")
        let span = document.createElement("span")
        message.appendChild(li).append(data.message)

        messages
        .appendChild(span)
        .append("by " + data.sender + " : " + formatTimeAgo(data.createdAt))
    })
})
})