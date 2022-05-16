class Api::CommentsController < ApplicationController
def index
    comments= Comment.all.order(:id)
    render json: comments
    
end


    def create
        comment= Comment.create(comment_params)
        if comment.valid?
            render json: comment, status: :ok
        else
            render json: {error: comment.errors}, status: :unprocessable_entity
        end
    end

    def destroy
        comment = Comment.find(params[:id])
        comment.destroy
    end


    private

    def comment_params
        params.permit(:user_id, :workout_id, :comment)
    end
    
end


