class Api::WorkoutExercisesController < ApplicationController

    def index
        workout_exercises = WorkoutExercise.all.order(:id)
        render json:workout_exercises
    end

    def update
        workout_exercise = WorkoutExercise.find(params[:id])
        workout_exercise .update(workout_exercises_params)
        render json: workout_exercise 

        
      end


    def create
        workout_exercises = WorkoutExercise.create(workout_exercises_params)
        if workout_exercises.valid?
       render json: workout_exercises, status: :ok
       else 
        render json: {error: workout_exercises.errors}, status: :unprocessable_entity
        end
        

    end

    private 

    def workout_exercises_params
        params.permit(:workout_id, :exercise_id, :sets, :reps, :weight, :time, :distance, :rest)
    end

end
