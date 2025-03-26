class Api::ListsController < ApplicationController
  def index
    @lists = User.find_by(username: params[:user_id]).lists
    render json: @lists
  end

  def create
    @list = List.new(list_params.merge(user_id: params[:user_id]))
    if @list.save
      render json: @list, status: :created
    else
      render json: @list.errors, status: :unprocessable_entity
    end
  end

  def show
    @list = List.find(params[:id])
    render json: @list, include: :celebrities
  end

  def destroy
    @list = List.find(params[:id])
    @list.destroy
    head :no_content
  end

  private

  def list_params
    params.require(:list).permit(:name, celebrity_ids: [])
  end
end
