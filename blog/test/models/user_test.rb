require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "should save user with valid attributes" do
    user = User.new(email: "test@example.com", password: "password123", password_confirmation: "password123")
    assert user.save
  end

  test "should not save user without email" do
    user = User.new(password: "password123", password_confirmation: "password123")
    assert_not user.save
  end

  test "should not save user with invalid email format" do
    user = User.new(email: "invalidemail", password: "password123", password_confirmation: "password123")
    assert_not user.save
  end

  test "should not save user without password" do
    user = User.new(email: "test@example.com", password_confirmation: "password123")
    assert_not user.save
  end

  test "should not save user if password and password_confirmation don't match" do
    user = User.new(email: "test@example.com", password: "password123", password_confirmation: "wrongpassword")
    assert_not user.save
  end

  test "should not save user with short password" do
    user = User.new(email: "test@example.com", password: "short", password_confirmation: "short")
    assert_not user.save
  end

  test "should generate a valid token" do
    user = User.create(email: "test@example.com", password: "password123", password_confirmation: "password123")
    token = user.generate_token
    decoded_token = JWT.decode(token, Rails.application.credentials.secret_key_base).first
    assert_equal user.id, decoded_token["user_id"]
    assert_in_delta 24.hours.from_now.to_i, decoded_token["exp"], 1.minute
  end
end
