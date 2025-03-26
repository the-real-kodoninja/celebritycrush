class Api::GroupsController < ApplicationController
  def index
    @groups = Group.all
    render json: @groups
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      render json: @group, status: :created
    else
      render json: @group.errors, status: :unprocessable_entity
    end
  end

  def show
    @group = Group.find(params[:id])
    render json: @group, include: :members
  end

  private

  def group_params
    params.require(:group).permit(:name, :description, :creator_id)
  end
end
