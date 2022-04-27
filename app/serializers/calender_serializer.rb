class CalenderSerializer < ActiveModel::Serializer
  attributes  :title, :user_id, :workout_id, :start_date, :end_date
end
