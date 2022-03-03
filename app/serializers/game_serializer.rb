class GameSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :play_count

  def play_count
    self.object.scores.count
  end
end
