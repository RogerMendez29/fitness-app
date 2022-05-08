class Workout < ApplicationRecord
    has_many :comments

    has_many :calenders
    has_many :workout_exercises

    belongs_to :user

end
