require 'test_helper'
require 'mocha/minitest'

class Api::V1::ContactsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:one)
    @headers = { 'Authorization' => "Bearer #{@user.generate_token}" }
  end

  test "should create contact form submission and send email" do
    assert_equal 0, ActionMailer::Base.deliveries.size

    contact_data = {
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      subject: "Inquiry about project",
      message: "I have a question about your project."
    }

    post api_v1_contacts_url, params: { contact: contact_data }, headers: @headers

    assert_response :created
    assert_equal 'Thank you for your message. We will get back to you soon!', JSON.parse(response.body)['message']

    assert_equal 1, ActionMailer::Base.deliveries.size
  end

  test "should handle errors in contact form submission" do
    ContactMailer.any_instance.stubs(:contact_email).raises(StandardError, "Email delivery failed")

    contact_data = {
      first_name: "Jane",
      last_name: "Smith",
      email: "jane.smith@example.com",
      subject: "Project Inquiry",
      message: "Can you provide more details on your project?"
    }

    post api_v1_contacts_url, params: { contact: contact_data }, headers: @headers

    assert_response :internal_server_error
    assert_includes JSON.parse(response.body)['error'], "There was an error processing your request. Please try again later."
  end
end
