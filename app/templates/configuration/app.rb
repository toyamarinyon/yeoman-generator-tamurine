require 'sinatra'
require 'slim'

enable :static
set :public_folder, Proc.new { File.join(root,  "assets") }

get '/' do
	slim :index
end
