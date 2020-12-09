require 'csv'

variants = CSV.parse(File.read('./db/data/variants.csv'), headers: :first_row)

variants.each do |v|
    Variant.create(protein_variant: v['protein_variant'], wt_amino_acid: v['wt_amino_acid'], 
        mt_amino_acid: v['mt_amino_acid'], aa_position: v['aa_position'])
end 

experiments = CSV.parse(File.read('./db/data/experiments.csv'), headers: :first_row)

experiments.each do |e|
    date = e['date'].split(".")
    date = "#{date[2]}-#{date[0]}-#{date[1]}"
    Experiment.create(date: date, wt_firefly: e['wt_firefly'], wt_renilla: e['wt_renilla'])
end

luciferase_values = CSV.parse(File.read('./db/data/luciferase_values.csv'), headers: :first_row)

luciferase_values.each do |lv|
    LuciferaseValue.create(firefly: lv['firefly'], renilla: lv['renilla'], 
        variant_id: lv['variant_id'], experiment_id: lv['experiment_id'])
end