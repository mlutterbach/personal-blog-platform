class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  def authenticate_user!
    header = request.headers['Authorization']
    token = header.split(' ').last if header

    if token
      begin
        decoded = JWT.decode(token, Rails.application.credentials.secret_key_base)[0]
        @current_user = User.find(decoded['user_id'])
        unless @current_user.email == Rails.application.credentials.authorized_user_email
          render json: { error: 'Unauthorized access' }, status: :forbidden
        end
      rescue ActiveRecord::RecordNotFound, JWT::DecodeError
        render json: { error: 'Unauthorized access' }, status: :unauthorized
      end
    else
      render json: { error: 'Token missing' }, status: :unauthorized
    end
  end
end
