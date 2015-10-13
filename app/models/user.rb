class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable

  def update_with_password(params={})
    puts "================update_with_password==========="
    current_password = params.delete(:current_password)

    if params[:password].blank?
      params.delete(:password)
      params.delete(:password_confirmation) if params[:password_confirmation].blank?
    end 

    valid_pwd = valid_password?(current_password)

    puts "============="
    puts params;
    puts current_password.blank?
    puts current_password
    puts valid_pwd
    puts "------------"
     
    result = if current_password.blank? || valid_pwd
      puts "-----result-----"
      update_attributes(params)
    else
      puts "errrr::::"
      self.errors.add(:current_password, current_password.blank? ? :blank : :invalid)
      self.attributes = params
      false
    end 

    puts "================"
    puts params
    puts "---------------"
    clean_up_passwords
    result
  end
           
end
