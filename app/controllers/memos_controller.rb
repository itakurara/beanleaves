class MemosController < ApplicationController
	def create
		@name = params[:user_name]
		render "home/index"
	end
end
