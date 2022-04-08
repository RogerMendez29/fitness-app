class CreatePersonalRecords < ActiveRecord::Migration[6.1]
  def change
    create_table :personal_records do |t|
      t.integer :user_id
      t.integer :exercise_id
      t.integer :value
      t.string :unit

      t.timestamps
    end
  end
end
