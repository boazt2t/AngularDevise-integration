class Users::RegistrationsController < Devise::RegistrationsController
 before_filter :configure_sign_up_params, only: [:create]
 before_filter :configure_account_update_params, only: [:update]
 #after_action :after_sign_up_path_for, only: [:create]

  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
  # def create
  #   super
  # end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_up_params
    devise_parameter_sanitizer.for(:sign_up) do |u|
      puts('==================15==================')
      u.permit(:email, :password, :password_confirmation, :first_name, :last_name, :phone_number)
    end
  end

  # If you have extra params to permit, append them to the sanitizer.
  def configure_account_update_params
    u.permit(:email, :password, :password_confirmation, :current_password, :first_name, :last_name, :phone_number)
  end

  # The path used after sign up.
  def after_sign_up_path_for()
    puts('==================after_sign_up_path_for==================')
    root_path
  end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
