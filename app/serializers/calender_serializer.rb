class CalenderSerializer < ActiveModel::Serializer
  attributes  :title, :user_id, :workout_id, :start, :end
end
