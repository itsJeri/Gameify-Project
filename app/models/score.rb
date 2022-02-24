class Score < ApplicationRecord
  belongs_to :user
  belongs_to :game

  validates :score, presence: true

  def self.sort_by_highest
    self.order(score: :desc)
  end
end
