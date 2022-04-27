class AddColumnToWorkouts < ActiveRecord::Migration[6.1]
  def change
    add_column :workouts, :user_id, :integer
    add_column :workouts, :description, :string

  end
end
