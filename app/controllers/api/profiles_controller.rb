class Api::ProfilesController < ApplicationController

    def index
        profiles= Profile.all.order(:id)
        render json: profiles, status: :ok
        
    end
    

    def create
        profile = Profile.create(profile_params)
        if profile.valid?
       render json: profile, status: :ok
       else 
        render json: {error: profile.errors}, status: :unprocessable_entity
        end
        

    end

    def update
        profile= Profile.find(params[:id])
        profile.update(profile_params)
        render json: profile 

        
      end

    private 

    def profile_params
        params.permit(:first_name, :last_name, :fitness_level, :weight, :bodyfat, :user_id,)
    end
end
