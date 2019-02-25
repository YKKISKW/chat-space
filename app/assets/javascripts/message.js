$(document).on('turbolinks:load',function() {

  function buildHtml(message){
    var html_text = `<div class = "group-chat">
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
    var html_image = `<div class = "group-chat">
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
    if (message.image !== null){
      html = html_image;
    } else {
      html = html_text;
    }
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

