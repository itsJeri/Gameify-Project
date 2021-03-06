class GamesController < ApplicationController
  skip_before_action :authorize, only: [:index, :leaderboards_index, :leaderboards_show]

  def index
    games = Game.all
    render json: games
  end

  def show
    game = Game.find(params[:id])
    render json: game
  end

  def leaderboards_index
    games = Game.all
    render json: games, each_serializer: LeaderboardsSerializer, include: ['scores.user']
  end

  def leaderboards_show
    game = Game.find(params[:id])
    render json: game, serializer: LeaderboardsSerializer, include: ['scores.user']
  end
end
