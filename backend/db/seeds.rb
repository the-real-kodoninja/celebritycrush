require 'json'

json_path = Rails.root.join('python', 'celebrities.json')
celebs = JSON.parse(File.read(json_path))
celebs.each do |celeb|
  Celebrity.create!(name: celeb['name'], json_path: json_path.to_s)
end
