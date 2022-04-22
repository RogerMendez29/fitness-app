class Api::WorkoutsController < ApplicationController

    def index
        workout = Workout.all.order(:id)
        render json:workout
    end


end
