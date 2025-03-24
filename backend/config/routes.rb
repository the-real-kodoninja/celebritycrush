Rails.application.routes.draw do
  namespace :api do
    resources :celebrities, only: [:index, :show]
  end
end

