class CommentSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :workout_id, :comment
end
