$(document).on('turbolinks:load' , function(){


  var search_list = $("#user-search-result");
  var add_list = $("#second")
  var userinfo = null;

  function addUserinfo(user){
    userinfo = user;
  }

  function appendUser(user) {
   var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}"
                data-user-name="${user.name}">追加</a>
               </div>`
   search_list.append(html);
  }

  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user}</p>
                </div>`
    search_list.append(html);
  }

  function appendUserLower(userinfo){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${userinfo.id}'>
                  <p class='chat-group-user__name'>${userinfo.name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    add_list.append(html);
  }

  $("#user-search-field").on("keyup",function(){
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0 &&  input.length !== 0){
        users.forEach(function(user){
         appendUser(user);
         addUserinfo(user);
       });
       } else {
        appendNoUser("一致するはユーザーはありません");
      }
      })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  $("#user-search-result").click(".chat-group-user__btn" ,function(){
    $(this).empty();
    // $(this).empty();
    appendUserLower(userinfo);
  });

  $(".chat-group-users").on("click", ".chat-group-user__btn" ,function(){
    destroy = $(this).parent();
    destroy.remove();    userinfo = null;
  });
});
