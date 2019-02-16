class CreateGroupUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :group_users do |t|
      t.references :user,forein_key:true
      t.references :group,forein_key:true
      t.timestamps
    end
  end
end
