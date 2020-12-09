Rails.application.routes.draw do
  resources :experiments
  resources :luciferase_values
  
  resources :variants, only: [:index]
  get '/variants/:protein_variant', to: 'variants#show'
end
