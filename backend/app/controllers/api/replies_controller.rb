class Api::RepliesController < ApplicationController
  def create
    @reply = Reply.new(reply_params)
    if @reply.save
      render json: @reply, status: :created
    else
      render json: @reply.errors, status: :unprocessable_entity
    end
  end

  private

  def reply_params
    params.require(:reply).permit(:user_id, :comment_id, :content)
  end
end
