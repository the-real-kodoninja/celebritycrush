class Api::ConversationsController < ApplicationController
  before_action :authenticate_user!

  def index
    @conversations = current_user.conversations
    render json: @conversations, include: [:sender, :recipient, :messages]
  end

  def show
    @conversation = current_user.conversations.find(params[:id])
    render json: @conversation, include: [:sender, :recipient, :messages]
  end

  def create
    recipient = User.find(params[:recipient_id])
    @conversation = Conversation.between(current_user.id, recipient.id)
    if @conversation.persisted?
      render json: @conversation, include: [:sender, :recipient, :messages], status: :created
    else
      render json: @conversation.errors, status: :unprocessable_entity
    end
  end
end
