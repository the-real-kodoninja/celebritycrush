class Api::MarketplaceItemsController < ApplicationController
  before_action :authenticate_user!

  def index
    @items = MarketplaceItem.where(status: "approved")
    render json: @items
  end

  def create
    @item = current_user.marketplace_items.build(item_params)
    if @item.save
      Notification.create(user: current_user, message: "Your marketplace item is pending approval.")
      render json: @item, status: :created
    else
      render json: @item.errors, status: :unprocessable_entity
    end
  end

  def approve
    @item = MarketplaceItem.find(params[:id])
    @item.update(status: "approved", approved: true)
    Notification.create(user: @item.user, message: "Your marketplace item '#{@item.title}' has been approved!")
    render json: @item
  end

  private

  def item_params
    params.require(:marketplace_item).permit(:title, :description, :price, :image_url, :celebrity_name)
  end
end
