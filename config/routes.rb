Homeapp::Application.routes.draw do
  root to: "root#index"
  resources :root, :only => [:index]
  resources :resume, :only => [:index]
  resources :asteroids
end
