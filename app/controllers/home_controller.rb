class HomeController < ApplicationController
	def index
		@memo = Memo.limit(5)
	end
end
