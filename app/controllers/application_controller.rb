class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  helper_method :current_user, :logged_in?

  def authenticate_user!
    header = request.headers['Authorization']
    token = header.split(' ').last if header

    if token
      begin
        decoded = JWT.decode(token, Rails.application.credentials.secret_key_base)[0]
        @current_user = User.find(decoded['user_id'])
      rescue ActiveRecord::RecordNotFound, JWT::DecodeError
        render json: { error: 'Unauthorized access' }, status: :unauthorized
      end
    else
      render json: { error: 'Token missing' }, status: :unauthorized
    end
  end

  def current_user
    @current_user
  end

  def logged_in?
    current_user.present?
  end

  def require_login
    render json: { error: 'Unauthorized access' }, status: :unauthorized unless logged_in?
  end
end
