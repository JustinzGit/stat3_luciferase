class CreateVariants < ActiveRecord::Migration[6.0]
  def change
    create_table :variants do |t|
      t.string :protein_variant
      t.string :wt_amino_acid
      t.string :mt_amino_acid
      t.integer :aa_position
      t.boolean :gof

      t.timestamps
    end
  end
end
