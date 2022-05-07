class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :height, :weight, :bodyfat, :fitness_level, :profile_photo, :profile_thumbnail, :first_name, :last_name, :bio
end
