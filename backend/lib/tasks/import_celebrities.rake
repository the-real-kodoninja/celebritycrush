namespace :db do
  desc "Import celebrity data from JSON"
  task import_celebrities: :environment do
    file = File.read(File.join(Rails.root, "python/celebrity_data.json"))
    data = JSON.parse(file)
    data.each do |celeb|
      Celebrity.find_or_create_by!(name: celeb["name"]) do |c|
        c.bio = celeb["bio"]
        c.data = celeb["data"]
      end
      puts "Imported #{celeb['name']}"
    end
  end
end
