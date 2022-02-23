class Score < ApplicationRecord
  belongs_to :user
  belongs_to :game

  validates :score, presence: true
end
