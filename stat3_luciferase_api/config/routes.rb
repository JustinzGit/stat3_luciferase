Rails.application.routes.draw do  
  resources :experiments, only: [:index, :create, :show, :update]
  # get '/experiments/date/:date', to: 'experiments#show'

  resources :variants, only: [:index]
  get '/variants/:protein_variant', to: 'variants#show'
end
