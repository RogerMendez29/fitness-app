class User < ApplicationRecord
    has_secure_password

    
    has_one :profile
    has_many :comments
    has_many :calenders
    has_many :workouts
    has_many :workout_exercises, through: :workouts

    has_many :followed_users, foreign_key: :follower_id, class_name: 'Follow'
    has_many :followees, through: :followed_users
    has_many :following_users, foreign_key: :followee_id, class_name: 'Follow'
    has_many :followers, through: :following_users


    

    validates :password, length: { minimum: 5, wrong_length: "Password must be at least 5 characters." }

    validates :email, presence: true, uniqueness: true
    validates :username, presence: true, uniqueness: true

    validates :phone, numericality: { only_integer: true }, length: {is:10}, allow_blank: true

end
