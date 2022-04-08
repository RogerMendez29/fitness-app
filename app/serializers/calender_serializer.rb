class CalenderSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :date, :time, :workout_id
end
