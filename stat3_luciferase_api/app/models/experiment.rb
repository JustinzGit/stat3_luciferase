class Experiment < ApplicationRecord
    validates :date, :wt_firefly, :wt_renilla, presence: true
    validates :date, uniqueness: true

    has_many :luciferase_values
    has_many :variants, through: :luciferase_values

    def calculate_ff_ren_ratio
        self.ff_ren_ratio = self.wt_firefly/self.wt_renilla
    end 
end