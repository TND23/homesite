class PagesController < ApplicationController

	def contact
	end

	def send_email
		sender_info = params[:sender_info]
		if ContactMailer.send_email(sender_info).deliver
			flash[:notice] = "Message Delivered"
		else
			flash[:notice] = "Hmmm... something went wrong."
		end
		render :json => flash[:notice]
	end

end