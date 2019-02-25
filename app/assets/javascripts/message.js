$(document).on('turbolinks:load',function() {

  function buildHtml(message){
    var html = `<div class = "group-chat">
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
    return html;
  }



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
      var html = buildHtml(data)
          $('.group-chats').append(html)
          $('.form-area__text').val('')
      console.log("aaa");
    })
    .fail(function(){
      alert('error');
    })
    .always(() => {
    $(".form-all__send").removeAttr("disabled");
      });

    var speed = 400;
    var target = $(".group-chat").last();
    var position = target.offset().top + $(".group-chats").scrollTop();
    $(".group-chats").animate({scrollTop: position},speed,'swing');
    })
  });

