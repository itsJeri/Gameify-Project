class ScoresController < ApplicationController
  def index
    scores = Score.all.sort_by_highest 
    render json: scores
  end

  def show
    score = Score.find(params[:id])
    render json: score
  end

  def leaderboards
    games = Game.all
    render json: games, each_serializer: LeaderboardsSerializer, include: ['scores.user']
  end

  # def user_scores

  # end
end
