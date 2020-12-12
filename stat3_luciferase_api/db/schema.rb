# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_12_12_034830) do

  create_table "experiments", force: :cascade do |t|
    t.date "date"
    t.float "wt_firefly"
    t.float "wt_renilla"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.float "ff_ren_ratio"
  end

  create_table "luciferase_values", force: :cascade do |t|
    t.float "firefly"
    t.float "renilla"
    t.integer "variant_id"
    t.integer "experiment_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.float "ff_ren_ratio"
    t.float "fold_change"
  end

  create_table "variants", force: :cascade do |t|
    t.string "protein_variant"
    t.string "wt_amino_acid"
    t.string "mt_amino_acid"
    t.integer "aa_position"
    t.boolean "gof"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.float "avg_fold_change"
  end

end
