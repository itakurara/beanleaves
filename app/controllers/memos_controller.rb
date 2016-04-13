class MemosController < ApplicationController
  include Slack

  skip_before_filter :verify_authenticity_token
  before_filter :verify_slack_token

  def create
    Memo.create!( content: params[:text] )
    render status: :ok, text: "φ(.. )ﾒﾓｼﾃｵｺ"
  end

  private

  def verify_slack_token
    render nothing: true, status: :forbidden and return unless Slack::TOKEN.include?(params[:token])
  end
end
