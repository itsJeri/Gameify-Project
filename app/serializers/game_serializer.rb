class GameSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :plays

  # has_many :scores do
  #   object.scores.sort_by_highest
  # end

  def plays
    self.object.scores.count
  end
end
