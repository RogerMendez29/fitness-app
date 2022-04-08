class Workout < ApplicationRecord

    has_many :calenders
    has_many :workout_exercises

end
