

# Exercise.create(name:"Push up", category: "full body", difficulty:"easy", description: "full body exercise that engages many muscles.")
# Exercise.create(name:"Pull Up", category: "upper body", difficulty:"intermediate", description: "upper body exercise where you grip an overhead bar and lift your body until your chin is above that bar.")
# Exercise.create(name:"Sit  Up", category: "conditioning", difficulty:"intermediate", description: "performed from a supine position by raising the torso to a sitting position and returning to the original position without using the arms or lifting the feet")

# Workout.create(name:"Every day Workout", difficulty:"easy")
# Workout.create(name:"second", difficulty:"easy", user_id:1)


# WorkoutExercise.create(workout_id:33, exercise_id:2, sets:2, reps:10, rest:20)
# WorkoutExercise.create(workout_id:33, exercise_id:1, sets:2, reps:10, rest:20)
# WorkoutExercise.create(workout_id:33, exercise_id:1, sets:2, reps:10, rest:20)



# require 'uri'
# require 'net/http'
# require 'openssl'

# url = URI("https://exercisedb.p.rapidapi.com/exercises")

# http = Net::HTTP.new(url.host, url.port)
# http.use_ssl = true
# http.verify_mode = OpenSSL::SSL::VERIFY_NONE

# request = Net::HTTP::Get.new(url)
# request["X-RapidAPI-Host"] = 'exercisedb.p.rapidapi.com'
# request["X-RapidAPI-Key"] = ENV["KEY"]

# response = http.request(request)
# exercises =  response.read_body

# parsedExercises= JSON.parse(exercises)

# puts parsedExercises.first


# parsedExercises.each do |exercise|

# Exercise.create(name:"#{exercise["name"]}", gif_url: "#{exercise["gifUrl"]}", equipment:"#{exercise["equipment"]}", target:"#{exercise["target"]}", bodypart:"#{exercise["bodyPart"]}")

# end


    










