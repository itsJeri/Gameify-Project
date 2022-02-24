class ScoreSerializer < ActiveModel::Serializer
  attributes :id, :score, :user_id, :game_id, :created_at

  belongs_to :user
  belongs_to :game
end
