require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user1 = users(:one)
  end

  test "should create session and return token for valid credentials" do
    post login_url, params: { email: @user1.email, password: 'password1' }

    assert_response :ok
    response_body = JSON.parse(response.body)
    assert_not_nil response_body['token']
    assert_equal 'Logged in successfully', response_body['message']
  end

  test "should not create session for invalid credentials" do
    post login_url, params: { email: @user1.email, password: 'wrongpassword' }

    assert_response :unauthorized
    response_body = JSON.parse(response.body)
    assert_equal 'Invalid username or password', response_body['error']
  end

  test "should destroy session and log out" do
    post login_url, params: { email: @user1.email, password: 'password1' }

    delete logout_url

    assert_response :ok
    response_body = JSON.parse(response.body)
    assert_equal 'Logged out successfully', response_body['message']
  end
end
