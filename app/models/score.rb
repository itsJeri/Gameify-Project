class Score < ApplicationRecord
  belongs_to :user
  belongs_to :game

  validates :score, presence: true

  def self.sort_by_highest
    self.order(score: :desc)
  end

  def self.sort_by_recent
    self.order(created_at: :desc)
  end
end
