class WorkoutExerciseSerializer < ActiveModel::Serializer
  attributes :id, :workout_id, :exercise_id, :sets, :reps, :weight, :time, :distance, :rest, :name


  def name
    Exercise.find(object.exercise_id).name

    
  end
  
end
