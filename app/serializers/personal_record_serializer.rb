class PersonalRecordSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :exercise_id, :value, :unit
end
