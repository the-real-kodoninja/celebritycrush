class Api::PaymentsController < ApplicationController
  before_action :authenticate_user!

  def create
    Stripe.api_key = ENV['STRIPE_SECRET_KEY']

    begin
      item = MarketplaceItem.find(params[:item_id])
      session = Stripe::Checkout::Session.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.title,
            },
            unit_amount: (item.price * 100).to_i, # Stripe expects amount in cents
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: 'http://localhost:3001/marketplace?success=true',
        cancel_url: 'http://localhost:3001/marketplace?cancel=true',
      })
      render json: { id: session.id }
    rescue Stripe::StripeError => e
      render json: { error: e.message }, status: :bad_request
    end
  end
end
