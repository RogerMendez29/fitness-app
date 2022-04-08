class TrainSerializer < ActiveModel::Serializer
  attributes :id, :trainer_id, :trainee_id
end
