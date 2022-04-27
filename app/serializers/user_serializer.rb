class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :password_digest, :trainer, :phone

  has_one :profile
  has_many :workouts
  has_many :calenders

end
