class MemosController < ApplicationController
	include Slack

	skip_before_filter :verify_authenticity_token
	before_filter :verify_slack_token

	def create
		@name = params[:user_name]
		render "home/index"
	end

	private

	def verify_slack_token
		render nothing: true, status: :forbidden and return unless Slack::TOKEN.include?(params[:token])
	end
end
