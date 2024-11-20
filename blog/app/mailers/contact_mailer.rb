class ContactMailer
  require 'sendgrid-ruby'
  include SendGrid

  def self.contact_email(contact)
    from = Email.new(email: 'mlutterb@gmail.com')
    to = Email.new(email: 'mlutterb@gmail.com')
    subject = contact[:subject]

    content = Content.new(
      type: 'text/html',
      value: "First name: #{contact[:first_name]}<br>Last name: #{contact[:last_name]}<br>Email: #{contact[:email]}<br>Message: #{contact[:message]}"
    )

    mail = Mail.new(from, subject, to, content)

    sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
    begin
      response = sg.client.mail._('send').post(request_body: mail.to_json)
      Rails.logger.info "Email sent with status code: #{response.status_code}"
      Rails.logger.info "Response body: #{response.body}"
    rescue StandardError => e
      Rails.logger.error "Failed to send email: #{e.message}"
    end
  end
end
