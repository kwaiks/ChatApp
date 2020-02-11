var socket = io();

(function(){
    $("form").submit(function(e){
        e.preventDefault();
        var sender = $("#sender").val()
        var message = $("#message").val()
        socket.emit('chat message', {sender:sender, message:message})
        $("#message").val("")
        return true;
    })
})();

(function(){
    socket.on("received", data  =>  {
    console.log(data)
    let  li  =  document.createElement("li");
    let  span  =  document.createElement("span");
    var  messages  =  document.getElementById("messages");
    messages.appendChild(li).append(data.message);
    messages.appendChild(span).append("by "  +  data.sender  +  ": "  +  "just now");
    messages.scrollTop = messages.scrollHeight;
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
        .append("by " + data.sender + " : " + formatTimeAgo(data.created_at))
    })
})
})