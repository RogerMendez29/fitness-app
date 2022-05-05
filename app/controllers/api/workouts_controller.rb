class Api::WorkoutsController < ApplicationController

    def index
        workout = Workout.all.order(:id)
        render json:workout
    end

   

    def create
        workout = Workout.create(workout_params)
        if workout.valid?
       render json: workout, status: :ok
       else 
        render json: {error: workout.errors}, status: :unprocessable_entity
        end
        
    end

    def destroy
        workout = Workout.find(params[:id])
        workout.destroy
    end

    private 

    def workout_params
        params.permit(:name, :difficulty, :user_id, :description)
    end


end
