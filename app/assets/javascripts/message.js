$(document).on('turbolinks:load',function() {

  function buildSendMessageHTML(message){
    if (message.image.url === null){
        var html_text = `<div class = "group-chat" data-id="${message.id}">
                          <div class = "group-chat__head">
                            <p class = "group-chat__head--user-name">
                              ${message.user_name}
                            </p>
                            <p class = "group-chat__head--date">
                              ${message.created_at}
                            </p>
                          </div>
                          <div class = "group-chat_lower">
                            <p class = "group-chat_lower--text">
                             ${message.body}
                            </p>
                           </div>
                        </div>`

      html = html_text;
    } else {
      var html_image = `<div class = "group-chat" data-id="${message.id}">
                          <div class = "group-chat__head">
                            <p class = "group-chat__head--user-name">
                              ${message.user_name}
                            </p>
                            <p class = "group-chat__head--date">
                               ${message.created_at}
                            </p>
                          </div>
                          <div class = "group-chat_lower">
                            <p class = "group-chat_lower--text">
                              <img class = "group-chat__image" src = "${message.image.url}" >
                            </p>
                          </div>
                       </div>`
      html = html_image;
    }
    return html;
  }

  function indexUpdate(){
    message = $('.group-chat');
if(message !== 0){
    var lastMessageId = $('.group-chat:last').data('id');
    } else {
      var lastMessageId = 0
    }

    $.ajax({
      url: location.href,
      type: "GET",
      data: {
        message: { id: lastMessageId }
      },
      dataType: 'json'
    })
    .always(function(newMessage){
      $.each(newMessage, function(i, newMessage){
        buildSendMessageHTML(newMessage);
        $('.group-chats').append(html)
      });
    })
  }

  $(function(){
    setInterval(indexUpdate, 5000);
  });




  $("#new_message").submit(function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildSendMessageHTML(data)
      $('.group-chats').append(html)
      $('form')[0].reset()
    })
    .fail(function(){
      alert('error');
    })
    .always(() => {
    $(".form-all__send").removeAttr("disabled");
      });

    var speed = 400;
    var target = $(".group-chat").last(); //子要素の一番最後を取得
    var position = target.offset().top + $(".group-chats").scrollTop();
    $(".group-chats").animate({scrollTop: position},speed,'swing');
    })
  });

