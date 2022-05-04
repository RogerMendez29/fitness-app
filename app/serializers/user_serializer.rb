class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :password_digest, :trainer, :phone, :created_at

  has_one :profile
  has_many :workouts
  has_many :calenders
  has_many :followers
  has_many :followees

end
