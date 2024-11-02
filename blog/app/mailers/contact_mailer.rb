class ContactMailer < ApplicationMailer
  default from: ENV['GMAIL_USERNAME']

  def contact_email(contact_params)
    @first_name = contact_params[:first_name]
    @last_name = contact_params[:last_name]
    @message = contact_params[:message]
    @subject = contact_params[:subject]

    mail(to: 'mlutterb@gmail.com', subject: "New Contact Form Submission: #{@subject}") do |format|
      format.text { render plain: "#{@first_name} #{@last_name} sent a message: #{@message}" }
      format.html { render html: "<strong>Message from:</strong> #{@first_name} #{@last_name}<br><strong>Email:</strong> #{contact_params[:email]}<br><strong>Message:</strong> #{@message}".html_safe }
    end
  end
end
