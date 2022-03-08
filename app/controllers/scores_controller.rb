class ScoresController < ApplicationController
  def index
    scores = Score.all
    render json: scores
  end

  def show
    score = Score.find(params[:id])
    render json: score
  end

  def create
    score = @current_user.scores.create!(score_params)
    render json: score, status: :created
  end
  # def user_scores

  # end
  
  private

  def score_params
    params.permit(:score, :user_id, :game_id)
  end
end
