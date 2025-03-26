class Api::GroupMembersController < ApplicationController
  def create
    @member = GroupMember.new(group_id: params[:group_id], user_id: params[:user_id])
    if @member.save
      render json: @member, status: :created
    else
      render json: @member.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @member = GroupMember.find_by(group_id: params[:group_id], user_id: params[:id])
    @member.destroy if @member
    head :no_content
  end
end
