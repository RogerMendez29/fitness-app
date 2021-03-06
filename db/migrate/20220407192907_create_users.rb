class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :email 
      t.string :password_digest
      t.boolean :trainer, default: false
      t.boolean :admin, default: false
      t.string :phone

      t.timestamps
    end
  end
end
