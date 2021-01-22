Rails.application.routes.draw do  
  resources :experiments
  
  resources :variants, only: [:index]
  get '/variants/:protein_variant', to: 'variants#show'
end
