class UserStatSerializer < ActiveModel::Serializer
  attributes :id, :username

has_many :scores
end