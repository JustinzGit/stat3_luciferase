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

    def set_variant_ids(lv_value_params)
        lv_value_params.map { |variant_entry|
            variant = Variant.find_by(protein_variant: variant_entry[:protein_variant])
            if variant
                variant_entry[:variant_id] = variant.id
            else 
                self.errors.add(:variant, "#{variant_entry[:protein_variant]} does not exist in db")
            end

            variant_entry.delete("protein_variant")
            variant_entry
        } 
    end 
end