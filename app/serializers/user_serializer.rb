class UserSerializer < ActiveModel::Serializer
  attributes :id, :email,:username, :trainer, :phone, :created_at, :user_can_modify

  has_one :profile
  has_many :workouts
  has_many :calenders
  has_many :followers
  has_many :followees

  def user_can_modify
    self.object.admin?
    
  end

end
