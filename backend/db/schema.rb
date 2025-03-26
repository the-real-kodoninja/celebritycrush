# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_03_26_171249) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "celebrities", force: :cascade do |t|
    t.string "name", null: false
    t.string "json_path"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_celebrities_on_name", unique: true
  end

  create_table "comments", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "fandom_post_id", null: false
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["fandom_post_id"], name: "index_comments_on_fandom_post_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "fandom_posts", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "celebrity_id", null: false
    t.text "content", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "media_url"
    t.string "media_type"
    t.index ["celebrity_id"], name: "index_fandom_posts_on_celebrity_id"
    t.index ["user_id"], name: "index_fandom_posts_on_user_id"
  end

  create_table "follows", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "celebrity_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["celebrity_id"], name: "index_follows_on_celebrity_id"
    t.index ["user_id", "celebrity_id"], name: "index_follows_on_user_id_and_celebrity_id", unique: true
    t.index ["user_id"], name: "index_follows_on_user_id"
  end

  create_table "group_members", force: :cascade do |t|
    t.bigint "group_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id", "user_id"], name: "index_group_members_on_group_id_and_user_id", unique: true
    t.index ["group_id"], name: "index_group_members_on_group_id"
    t.index ["user_id"], name: "index_group_members_on_user_id"
  end

  create_table "groups", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.bigint "creator_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creator_id"], name: "index_groups_on_creator_id"
  end

  create_table "likes", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "fandom_post_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["fandom_post_id"], name: "index_likes_on_fandom_post_id"
    t.index ["user_id"], name: "index_likes_on_user_id"
  end

  create_table "list_celebrities", force: :cascade do |t|
    t.bigint "list_id", null: false
    t.bigint "celebrity_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["celebrity_id"], name: "index_list_celebrities_on_celebrity_id"
    t.index ["list_id", "celebrity_id"], name: "index_list_celebrities_on_list_id_and_celebrity_id", unique: true
    t.index ["list_id"], name: "index_list_celebrities_on_list_id"
  end

  create_table "lists", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_lists_on_user_id"
  end

  create_table "messages", force: :cascade do |t|
    t.bigint "sender_id", null: false
    t.bigint "receiver_id", null: false
    t.text "content", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["receiver_id"], name: "index_messages_on_receiver_id"
    t.index ["sender_id"], name: "index_messages_on_sender_id"
  end

  create_table "replies", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "comment_id", null: false
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["comment_id"], name: "index_replies_on_comment_id"
    t.index ["user_id"], name: "index_replies_on_user_id"
  end

  create_table "scraped_celebrities", force: :cascade do |t|
    t.string "name"
    t.datetime "scraped_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shares", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "fandom_post_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["fandom_post_id"], name: "index_shares_on_fandom_post_id"
    t.index ["user_id"], name: "index_shares_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email", null: false
    t.string "bio"
    t.string "profile_photo"
    t.string "banner"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "comments", "fandom_posts"
  add_foreign_key "comments", "users"
  add_foreign_key "fandom_posts", "celebrities"
  add_foreign_key "fandom_posts", "users"
  add_foreign_key "follows", "celebrities"
  add_foreign_key "follows", "users"
  add_foreign_key "group_members", "groups"
  add_foreign_key "group_members", "users"
  add_foreign_key "groups", "users", column: "creator_id"
  add_foreign_key "likes", "fandom_posts"
  add_foreign_key "likes", "users"
  add_foreign_key "list_celebrities", "celebrities"
  add_foreign_key "list_celebrities", "lists"
  add_foreign_key "lists", "users"
  add_foreign_key "messages", "users", column: "receiver_id"
  add_foreign_key "messages", "users", column: "sender_id"
  add_foreign_key "replies", "comments"
  add_foreign_key "replies", "users"
  add_foreign_key "shares", "fandom_posts"
  add_foreign_key "shares", "users"
end
