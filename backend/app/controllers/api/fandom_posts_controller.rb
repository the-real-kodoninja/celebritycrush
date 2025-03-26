class Api::FandomPostsController < ApplicationController
  def index
    @posts = FandomPost.where(celebrity_id: params[:celebrity_id])
    render json: @posts
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
    params.require(:fandom_post).permit(:user_id, :celebrity_id, :content)
  end
end
