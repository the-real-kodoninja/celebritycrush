class Api::LikesController < ApplicationController
  def create
    @like = Like.new(user_id: params[:user_id], fandom_post_id: params[:fandom_post_id])
    if @like.save
      render json: @like, status: :created
    else
      render json: @like.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @like = Like.find_by(user_id: params[:user_id], fandom_post_id: params[:fandom_post_id])
    @like.destroy if @like
    head :no_content
  end
end
