class Api::ExercisesController < ApplicationController

    def index
        exercises = Exercise.all.order(:id)
        render json:exercises
    end

    def show
        exercise = Exercise.find(params[:id])
        render json:exercise
    end

    def create
        exercise= Exercise.create(exercise_params)
       if exercise.valid?
            render json: exercise, status: :ok
       else 
        renders json: {error: exercise.errors.full_messages} , status: :unprocessable_entity
       end
    end


    private

    def exercise_params
        params.permit(:name, :target, :bodypart, :equipment, :gif_url)
    end

end

