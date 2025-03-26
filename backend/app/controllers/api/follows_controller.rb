class Api::FollowsController < ApplicationController
  def index
    @follows = User.find_by(username: params[:user_id]).follows
    render json: @follows
  end

  def create
    @follow = Follow.new(user_id: params[:user_id], celebrity_id: params[:celebrity_id])
    if @follow.save
      render json: @follow, status: :created
    else
      render json: @follow.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @follow = Follow.find_by(user_id: params[:user_id], celebrity_id: params[:id])
    @follow.destroy if @follow
    head :no_content
  end
end
