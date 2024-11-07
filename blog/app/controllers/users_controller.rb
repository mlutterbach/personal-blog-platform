class UsersController < ApplicationController
  before_action :authenticate_user!, only: [:me]
  def index
    @users = User.all
    render json: @users
  end

  def new
    @user = User.new
    render json: @user
  end

  def create
    @user = User.create(user_params)
    if @user.save
      session[:user_id] = @user.id
      render json: { message: "User created successfully" }, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def me
    render json: @current_user
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
