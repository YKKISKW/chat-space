if @new_message.present?
  json.array! @new_message do |message|
    json.id message.id
    json.body  message.body
    json.user_name  message.user.name
    json.created_at  message.created_at
    json.image  message.image
  end
end
