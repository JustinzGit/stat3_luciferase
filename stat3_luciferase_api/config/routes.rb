Rails.application.routes.draw do
  resources :experiments
  resources :luciferase_values
  resources :variants
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
