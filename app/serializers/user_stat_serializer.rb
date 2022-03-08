class UserStatSerializer < ActiveModel::Serializer
  attributes :id, :username

has_many :scores do
  object.scores.sort_by_recent
end
end