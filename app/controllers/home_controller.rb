class HomeController < ApplicationController
	def index
		@memo = Memo.limit(5)
		@name = params[:user_name]
	end
end
