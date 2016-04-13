class HomeController < ApplicationController
  def index
		@memos = Memo.limit(5)
  end
end
