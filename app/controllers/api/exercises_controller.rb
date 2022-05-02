class Api::ExercisesController < ApplicationController

    def index
        exercises = Exercise.all.order(:id)
        render json:exercises
    end
end
