class Variant < ApplicationRecord
    has_many :luciferase_values
    has_many :experiments through :luciferase_values
end