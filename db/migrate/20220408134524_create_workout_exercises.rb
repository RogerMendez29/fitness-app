class CreateWorkoutExercises < ActiveRecord::Migration[6.1]
  def change
    create_table :workout_exercises do |t|
      t.integer :workout_id
      t.integer :exercise_id
      t.integer :sets
      t.integer :reps
      t.integer :weight
      t.integer :time
      t.integer :distance
      t.integer :rest

      t.timestamps
    end
  end
end
