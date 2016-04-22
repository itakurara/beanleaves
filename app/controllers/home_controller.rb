class HomeController < ApplicationController
  def index
    @memos = Memo.limit(25)
  end
end
