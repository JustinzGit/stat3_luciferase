Rails.application.routes.draw do
  resources :luciferase_values
  
  resources :experiments, only: [:index]
  get '/experiments/:date', to: 'experiments#show'

  resources :variants, only: [:index]
  get '/variants/:protein_variant', to: 'variants#show'
end
