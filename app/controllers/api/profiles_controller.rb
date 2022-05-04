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

      def upload
        current_user.profile.update(update_profile_urls)
         render json: current_user, status: :ok
       
     end

    private 

    def profile_params
        params.permit(:first_name, :last_name, :fitness_level, :weight, :bodyfat, :user_id, :height, :profile_photo, :profile_thumbnail)
    end

    def update_profile_urls
        params.permit(:profile_photo, :profile_thumbnail)
      end
end
