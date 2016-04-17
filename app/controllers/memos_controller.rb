class MemosController < ApplicationController
  # これあとでコメントアウト消すこと！
  #include Slack

  skip_before_filter :verify_authenticity_token
  before_filter :verify_slack_token, except: [:index, :update]

  def index
    @memos = Memo.all.order(created_at: :desc)
    render json: @memos
  end

  def create
    Memo.create!( content: params[:text] )
    render status: :ok, text: "φ(.. )ﾒﾓｼﾃｵｺ"
  end

  def update
    memo = Memo.find(params[:id])
    memo.update(content: params[:text])
    @memos = Memo.all.order(created_at: :desc)
    render json: @memos
  end

  private

  def verify_slack_token
    render nothing: true, status: :forbidden and return unless Slack::TOKEN.include?(params[:token])
  end
end
