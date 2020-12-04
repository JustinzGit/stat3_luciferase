class Experiment < ApplicationRecord
    has_many :luciferase_values
    has_many :variants through: :luciferase_values
end