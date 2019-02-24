require 'rails_helper'

describe Message do
  describe '#create' do
    context 'can save' do
      it "can save with body" do
        expect(build(:message, image: nil)).to be_valid
      end

      it "can save with image" do
        expect(build(:message, body: nil)).to be_valid
      end

      it "can save with image" do
        expect(build(:message)).to be_valid
      end
    end

    context 'cant save' do
      it "can't save withont image & body" do
        message = build(:message,body:nil,image:nil)
        message.valid?
        expect(message.errors[:body]).to include("を入力してください")
      end

      it "can't save withont group_id" do
        message = build(:message,group_id:nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      it "can't save withont user_id" do
        message = build(:message,user_id:nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end

  end
end
