class Api::FandomPostsController < ApplicationController
  def index
    @posts = FandomPost.where(celebrity_id: params[:celebrity_id]).includes(:likes, :comments, :shares, comments: :replies)
    render json: @posts, include: { likes: { only: [:id, :user_id] }, comments: { include: :replies }, shares: { only: [:id, :user_id] } }
  end

  def create
    @post = FandomPost.new(fandom_post_params)
    if @post.save
      render json: @post, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  private

  def fandom_post_params
    params.require(:fandom_post).permit(:user_id, :celebrity_id, :content, :media_url, :media_type)
  end
end
