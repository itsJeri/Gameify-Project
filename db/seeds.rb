puts "Seeding Users...Apologies, this might take a while"

u1 = User.create!(username: "Jeri", password: "abc123", password_confirmation: "abc123", email: "faker@gmail.com")
u2 = User.create!(username: "Gerry", password: "abc123", password_confirmation: "abc123", email: "gerry@gmail.com")
u3 = User.create!(username: "TheRealHamster", password: "abc123", password_confirmation: "abc123", email: "hamster@yahoo.com")
u4 = User.create!(username: "SquirrelBrain", password: "abc123", password_confirmation: "abc123", email: "squirrel@yahoo.com")
u5 = User.create!(username: "DolphinLover", password: "abc123", password_confirmation: "abc123", email: "DolphinsAreAwesome@yahoo.com")

30.times do |i|
  User.create!(username: Faker::Creature::Animal.unique.name.capitalize(), password: "qwerty123", password_confirmation: "qwerty123", email: Faker::Internet.unique.email)
end

puts "Seeding Games..."
g1 = Game.create(name: "Pathfinder", description: "Best the AI in finding the shortest path possible")
g2 = Game.create(name: "Number Memory", description: "How many digits can you memorize?")
g3 = Game.create(name: "Typing Test", description: "Test your typing speed")


puts "Seeding Scores..."

# Pathfinder scores
30.times do |i|
  Score.create(score: rand(1...8), user_id: i, game: g1)
end

30.times do |i|
  Score.create(score: rand(1...20), user_id: i, game: g1)
end

30.times do |i|
  Score.create(score: rand(20...35), user_id: i, game: g1)
end

20.times do |i|
  Score.create(score: rand(25...45), user_id: i, game: g1)
end

15.times do |i|
  Score.create(score: rand(45...60), user_id: i, game: g1)
end

5.times do |i|
  Score.create(score: rand(50...70), user_id: i, game: g1)
end

Score.create(score: 71, user: u3, game: g1)
Score.create(score: 72, user: u4, game: g1)

# Number Memory scores
30.times do |i|
  Score.create(score: rand(1...8), user_id: i, game: g2)
end

30.times do |i|
  Score.create(score: rand(1...8), user_id: i, game: g2)
end

30.times do |i|
  Score.create(score: rand(5...10), user_id: i, game: g2)
end

20.times do |i|
  Score.create(score: rand(5...12), user_id: i, game: g2)
end

15.times do |i|
  Score.create(score: rand(8...20), user_id: i, game: g2)
end

5.times do |i|
  Score.create(score: rand(13...20), user_id: i, game: g2)
end

Score.create(score: 24, user: u5, game: g2)

# Typing Test scores
30.times do |i|
  Score.create(score: rand(25...60), user_id: i, game: g3)
end

30.times do |i|
  Score.create(score: rand(45...100), user_id: i, game: g3)
end

30.times do |i|
  Score.create(score: rand(75...110), user_id: i, game: g3)
end

20.times do |i|
  Score.create(score: rand(70...125), user_id: i, game: g3)
end

15.times do |i|
  Score.create(score: rand(90...130), user_id: i, game: g3)
end

5.times do |i|
  Score.create(score: rand(130...170), user_id: i, game: g3)
end

puts "Done!"