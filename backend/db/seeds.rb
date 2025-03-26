# Clear existing data
ScrapedCelebrity.destroy_all

# Seed initial celebrities
initial_celebrities = [
  "Billie Eilish",
  "Zendaya",
  "Lynette Adkins",
  "Timothée Chalamet",
  "Ariana Grande",
  "Harry Styles"
]

initial_celebrities.each do |name|
  ScrapedCelebrity.create!(name: name)
end

puts "Seeded #{ScrapedCelebrity.count} celebrities!"
