class Api::UsersController < ApplicationController
  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.find_by(username: params[:id])
    render json: @user if @user
  end
end
