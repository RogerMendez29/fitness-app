Rails.application.routes.draw do
  
  resources :trains
  resources :follows
  resources :workout_exercises
  resources :calenders
  resources :personal_records
  resources :workouts
  resources :exercises
  resources :profiles
  resources :users

  post '/users/:id/follow', to: "users#follow"
  post '/users/:id/unfollow', to: "users#unfollow"

  post '/users/:id/train', to: "users#train"
  post '/users/:id/untrain', to: "users#untrain"


  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
