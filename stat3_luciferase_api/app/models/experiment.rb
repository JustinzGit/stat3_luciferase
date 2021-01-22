class Experiment < ApplicationRecord
    validates :date, :wt_firefly, :wt_renilla, presence: true
    validates :date, uniqueness: true

    has_many :luciferase_values
    has_many :variants, through: :luciferase_values

    accepts_nested_attributes_for :luciferase_values
end