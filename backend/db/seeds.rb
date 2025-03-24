User.create(email: "fan@example.com", username: "fan1", role: :fan)
User.create(email: "billie@example.com", username: "billieeilish", role: :celebrity)
Celebrity.create(name: "Billie Eilish", bio: "Singer-songwriter", data: { twitter: "@billieeilish" })