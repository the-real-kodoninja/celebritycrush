class Api::SharesController < ApplicationController
  def create
    @share = Share.new(user_id: params[:user_id], fandom_post_id: params[:fandom_post_id])
    if @share.save
      render json: @share, status: :created
    else
      render json: @share.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @share = Share.find_by(user_id: params[:user_id], fandom_post_id: params[:fandom_post_id])
    @share.destroy if @share
    head :no_content
  end
end
