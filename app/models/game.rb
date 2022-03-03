class Game < ApplicationRecord
  has_many :scores
  has_many :users, -> { distinct }, through: :scores
end
