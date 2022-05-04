class Api::FollowsController < ApplicationController
    def create
        @user = User.find(params[:id])
        current_user.followees << @user
      end
      
      def destroy
        @user = User.find(params[:id])
        current_user.followed_users.find_by(followee_id: @user.id).destroy
      end
end
