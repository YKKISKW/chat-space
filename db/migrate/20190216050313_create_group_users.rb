class CreateGroupUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :group_users do |t|
      t.references :users,forein_key:true
      t.references :groups,forein_key:true
      t.timestamps
    end
  end
end
