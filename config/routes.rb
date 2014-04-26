Homeapp::Application.routes.draw do
  root to: "root#index"
  resources :root, :only => [:index]
  resources :resume, :only => [:index]
  resources :asteroids
  resources :snakes
  match "contact", :to => "pages#contact", :as => "contact", :via => :get
  match "send_email", :to => "pages#send_email", :as => "send_email", :via => :post
end
