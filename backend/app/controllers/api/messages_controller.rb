class Api::MessagesController < ApplicationController
  def index
    @messages = Message.where(receiver_id: params[:user_id])
    render json: @messages
  end

  def create
    @message = Message.new(message_params)
    if @message.save
      render json: @message, status: :created
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  private

  def message_params
    params.require(:message).permit(:sender_id, :receiver_id, :content)
  end
end
