class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :password_digest, :trainer, :admin, :phone
end
