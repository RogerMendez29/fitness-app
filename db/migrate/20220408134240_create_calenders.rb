class CreateCalenders < ActiveRecord::Migration[6.1]
  def change
    create_table :calenders do |t|
      t.integer :user_id
      t.integer :date
      t.string :time
      t.integer :workout_id

      t.timestamps
    end
  end
end
