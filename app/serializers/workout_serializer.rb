class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :name, :difficulty, :description, :user_id, :posted_by

  def posted_by
    first_name = User.find(object.user_id).profile.first_name
    last_name = User.find(object.user_id).profile.last_name
    "#{first_name} #{last_name}"


  end
  

  has_many :workout_exercises
  has_many :comments

end
