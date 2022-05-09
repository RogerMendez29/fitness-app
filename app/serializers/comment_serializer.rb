class CommentSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :workout_id, :comment, :created_at, :created_time, :created_date, :full_name, :thumbnail_url
   
def full_name
  
  user = User.find(object.user_id)
  profile=user.profile
  full_name = profile.first_name + " " + profile.last_name

end

def thumbnail_url
  
  user = User.find(object.user_id)
  profile=user.profile
  url = profile.profile_thumbnail

end






   def created_time
    Time.zone= "America/New_York"
    
    object.created_at.strftime("%I:%M %P")
   end

   def created_date
    Time.zone= "America/New_York"
    object.created_at.strftime("%F")

    # Date.parse(object.created_at)

   end
end
