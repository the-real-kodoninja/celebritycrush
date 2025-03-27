class Api::ReviewsController < ApplicationController
  before_action :authenticate_user!

  def create
    @item = MarketplaceItem.find(params[:marketplace_item_id])
    @review = @item.reviews.build(review_params)
    @review.user = current_user

    if @review.save
      render json: @review, status: :created
    else
      render json: @review.errors, status: :unprocessable_entity
    end
  end

  private

  def review_params
    params.require(:review).permit(:rating, :comment)
  end
end
