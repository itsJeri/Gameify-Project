class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create, :index, :show_stats]

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def index
    users = User.all
    render json: users
  end

  def show
    render json: @current_user
  end

  def show_stats
    user = User.find(params[:id])
    render json: user, serializer: UserStatSerializer
  end

  private

  def user_params
    params.permit(:username, :password, :password_confirmation, :email)
  end
end
