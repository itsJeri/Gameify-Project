# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "Seeding Users...Sorry, this might take a while"

u1 = User.create!(username: "Jeri", password: "abc123", password_confirmation: "abc123", email: "faker@gmail.com")
u2 = User.create!(username: "Gerry", password: "abc123", password_confirmation: "abc123", email: "gerry@gmail.com")

100.times do |i|
  User.create!(username: Faker::Creature::Animal.unique.name, password: "qwerty123", password_confirmation: "qwerty123", email: Faker::Internet.unique.email)
end

puts "Seeding Games..."
g1 = Game.create(name: "Pathfinder", description: "Best the AI in finding the shortest path possible")
g2 = Game.create(name: "Number Memory", description: "How many digits can you memorize?")


puts "Seeding Scores..."
# Score.create([
#   {
#     score: 3000,
#     user: u1,
#     game: g1
#   },
#   {
#     score: 15000,
#     user: u1,
#     game: g1
#   },
#   {
#     score: 13000,
#     user: u2,
#     game: g1
#   },
#   {
#     score: 9,
#     user: u1,
#     game: g2
#   },
#   {
#     score: 10,
#     user: u2,
#     game: g2
#   }
# ])

# Pathfinder scores
100.times do |i|
  Score.create(score: rand(1...40), user_id: i, game: g1)
end

50.times do |i|
  Score.create(score: rand(40...70), user_id: i, game: g1)
end

# Number Memory scores
100.times do |i|
  Score.create(score: rand(1...8), user_id: i, game: g2)
end

50.times do |i|
  Score.create(score: rand(8...20), user_id: i, game: g2)
end


puts "Done!"