require 'csv'

variants = CSV.parse(File.read('./db/data/variant.csv'), headers: :first_row)

variants.each do |v|
    Variant.create(protein_variant: v['protein_variant'], wt_amino_acid: v['wt_amino_acid'], 
        mt_amino_acid: v['mt_amino_acid'], aa_position: v['aa_position'])
end 