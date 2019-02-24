FactoryGirl.define do
  factory :message do
    body Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/uploads/message/image/2/0a7097bb41c83f8bb98ab1f9fd57058b.jpg")
    user
    group
  end

end
