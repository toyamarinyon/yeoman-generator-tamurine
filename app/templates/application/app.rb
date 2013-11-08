require 'sinatra'
require 'sinatra/reloader'
require 'slim'
require 'sass'
require 'compass'
require 'coffee-script'

set :static, true
set :public_folder, File.dirname(__FILE__) + '/assets'
set :views, File.dirname(__FILE__) + '/templates'

get '/' do
	slim :'views/index'
end

get '/application.css' do
	sass(:"assets/sass/application", Compass.sass_engine_options )
end

get '/application.js' do
	coffee :'assets/coffee/application'
end
