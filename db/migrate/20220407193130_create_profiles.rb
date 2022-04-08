class CreateProfiles < ActiveRecord::Migration[6.1]
  def change
    create_table :profiles do |t|
      t.integer :user_id
      t.integer :height
      t.integer :weight
      t.integer :bodyfat
      t.string :fitness_level
      t.string :profile_avatar
      t.string :profile_thumbnail



      t.timestamps
    end
  end
end
