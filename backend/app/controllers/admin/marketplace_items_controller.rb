class Admin::MarketplaceItemsController < ApplicationController
  before_action :authenticate_user!
  before_action :ensure_admin

  def index
    @items = MarketplaceItem.where(status: "pending")
    render json: @items
  end

  def approve
    @item = MarketplaceItem.find(params[:id])
    @item.update(status: "approved", approved: true)
    Notification.create(user: @item.user, message: "Your marketplace item '#{@item.title}' has been approved!")
    render json: @item
  end

  def reject
    @item = MarketplaceItem.find(params[:id])
    @item.update(status: "rejected", approved: false)
    Notification.create(user: @item.user, message: "Your marketplace item '#{@item.title}' was rejected.")
    render json: @item
  end

  private

  def ensure_admin
    unless current_user.admin?
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
end
