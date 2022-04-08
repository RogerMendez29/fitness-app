class CreateTrains < ActiveRecord::Migration[6.1]
  def change
    create_table :trains do |t|
      t.integer :trainer_id
      t.integer :trainee_id

      t.timestamps
    end
  end
end
