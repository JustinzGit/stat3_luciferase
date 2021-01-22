class Experiment < ApplicationRecord
    validates :date, :wt_firefly, :wt_renilla, presence: true
    validates :date, uniqueness: true

    has_many :luciferase_values
    has_many :variants, through: :luciferase_values

    accepts_nested_attributes_for :luciferase_values

    # Sets WT firefly / renilla ratio
    def calculate_ff_ren_ratio
        self.ff_ren_ratio = self.wt_firefly/self.wt_renilla
    end 

    # Iterates through experiments luciferase values 
    # Sets Firefly / Renilla ratio for each variant
    # Calculates the fold change for each variant
    def calculate_fold_changes
        self.luciferase_values.each do |lv|
            lv.ff_ren_ratio = lv.firefly/lv.renilla
            lv.fold_change = lv.ff_ren_ratio/self.ff_ren_ratio
        end 
    end
    
    def set_ratios_and_fold_changes
        self.calculate_ff_ren_ratio
        self.calculate_fold_changes
    end 

    # Sets ratios and fold changes of new luciferase entries on updated
    def perform_lv_calculations(params)
        upadted_lv = params[:luciferase_values_attributes].map { |lv|
            if !lv[:ff_ren_ratio]
                lv[:ff_ren_ratio] = lv[:firefly].to_i/lv[:renilla].to_i
                lv[:fold_change] = lv[:ff_ren_ratio]/self.ff_ren_ratio
            end
            lv
        }
        params[:luciferase_values_attributes] = upadted_lv
        return params
    end
end