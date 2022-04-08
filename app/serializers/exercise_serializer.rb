class ExerciseSerializer < ActiveModel::Serializer
  attributes :id, :name, :type, :difficulty, :description
end
