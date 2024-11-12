require "test_helper"

class ContactMailerTest < ActionMailer::TestCase
  test "contact email sends correctly" do
    contact_params = {
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      subject: "Inquiry about product",
      message: "I would like more information about your product."
    }

    email = ContactMailer.contact_email(contact_params).deliver_now

    assert_not ActionMailer::Base.deliveries.empty?

    assert_equal ['mlutterb@gmail.com'], email.to

    assert_equal "New Contact Form Submission: Inquiry about product", email.subject

    assert_equal [ENV['GMAIL_USERNAME']], email.from

    assert_includes email.text_part.body.to_s, "John Doe sent a message: I would like more information about your product."

    assert_includes email.html_part.body.to_s, "<strong>Message from:</strong> John Doe"
    assert_includes email.html_part.body.to_s, "<strong>Email:</strong> john.doe@example.com"
    assert_includes email.html_part.body.to_s, "<strong>Message:</strong> I would like more information about your product."
  end
end
