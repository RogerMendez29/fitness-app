class Api::ExercisesController < ApplicationController

    def index
        exercises = Exercise.all.order(:id)
        render json:exercises
    end



    def show
        exercise = Exercise.find(params[:id])
        render json:exercise
    end
end
