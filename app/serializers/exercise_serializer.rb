class ExerciseSerializer < ActiveModel::Serializer
  attributes :id, :name, :target, :bodypart, :equipment, :gif_url
end
