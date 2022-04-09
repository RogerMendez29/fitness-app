class User < ApplicationRecord
    has_one :profile
    has_one :calender


    

    has_many :followers, foreign_key: :follower_id, class_name: 'Follow'
    has_many :followees, foreign_key: :followee_id, class_name: "Follow"

    has_many :trainers, foreign_key: :trainer_id, class_name: 'Train'

    has_many :trainees, foreign_key: :trainee_id, class_name: 'Train'

end