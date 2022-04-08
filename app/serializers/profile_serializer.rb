class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :height, :weight, :bodyfat, :fitness_level, :profile_avatar
end
