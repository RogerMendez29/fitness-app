class Api::CalendersController < ApplicationController

    def index
        calender_events= Calender.all.order(:id)
        render json: calender_events, status: :ok
        
    end
    

    def create
        event = Calender.create(event_params)
        if event.valid?
       render json: event, status: :ok
       else 
        render json: {error: event.errors}, status: :unprocessable_entity
        end
        

    end

    

    private 

    def event_params
        params.permit(:title, :user_id, :workout_id, :start_date, :end_date)
    end
end
