class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordNotFound, with: :cant_find


  private 
      def current_user
        User.find_by(id: session[:user_id])  
      end

      def cant_find(error)
        render json: {error: error.message }, status: :not_found
      end
      

end
