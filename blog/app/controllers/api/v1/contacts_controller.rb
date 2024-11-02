module Api
  module V1
    class ContactsController < ApplicationController
      protect_from_forgery with: :null_session

      def create
        contact_params = params.require(:contact).permit(:first_name, :last_name, :email, :subject, :message)

        Rails.logger.info "Received Contact Form Submission: #{contact_params}"

        # Trigger email notification
        ContactMailer.contact_email(contact_params).deliver_now

        render json: { message: 'Thank you for your message. We will get back to you soon!' }, status: :created
      rescue StandardError => e
        Rails.logger.error "Error processing contact form submission: #{e.message}"
        render json: { error: 'There was an error processing your request. Please try again later.' }, status: :internal_server_error
      end
    end
  end
end
