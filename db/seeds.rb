# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "Seeding Users..."

u1 = User.create(username: "Jeri", password: "abc123", password_confirmation: "abc123", email: "faker@gmail.com")
u2 = User.create(username: "Gerry", password: "abc123", password_confirmation: "abc123", email: "gerry@gmail.com")


puts "Seeding Games..."
g1 = Game.create(name: "Pathfinder", description: "Best the AI in finding the shortest path possible")
g2 = Game.create(name: "Number Memory", description: "How many digits can you memorize?")


puts "Seeding Scores..."
Score.create([
  {
    score: 3000,
    user: u1,
    game: g1
  },
  {
    score: 15000,
    user: u1,
    game: g1
  },
  {
    score: 13000,
    user: u2,
    game: g1
  },
  {
    score: 9,
    user: u1,
    game: g2
  },
  {
    score: 10,
    user: u2,
    game: g2
  }
])


puts "Done!"