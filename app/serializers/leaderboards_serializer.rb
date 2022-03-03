class LeaderboardsSerializer < ActiveModel::Serializer
  attributes :id, :name, :play_count

  has_many :scores do
    object.scores.sort_by_highest
  end

  def play_count
    self.object.scores.count
  end
end
