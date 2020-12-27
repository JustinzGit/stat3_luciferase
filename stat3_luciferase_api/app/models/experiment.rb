class Experiment < ApplicationRecord
    validates :date, :wt_firefly, :wt_renilla, presence: true
    validates :date, uniqueness: true

    has_many :luciferase_values
    has_many :variants, through: :luciferase_values

    def calculate_ff_ren_ratio
        self.ff_ren_ratio = self.wt_firefly/self.wt_renilla
    end 

    def calculate_fold_changes
        self.luciferase_values.each do |lv|
            lv.ff_ren_ratio = lv.firefly/lv.renilla
            lv.fold_change = lv.ff_ren_ratio/self.ff_ren_ratio
        end 
    end 
end