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

    wt_ff = e['wt_firefly'].to_f
    wt_ren = e['wt_renilla'].to_f
    ff_ren_ratio = wt_ff/wt_ren

    Experiment.create(date: date, wt_firefly: wt_ff, wt_renilla: wt_ren, ff_ren_ratio: ff_ren_ratio )
end

luciferase_values = CSV.parse(File.read('./db/data/luciferase_values.csv'), headers: :first_row)

luciferase_values.each do |lv|
    ff = lv['firefly'].to_f
    ren = lv['renilla'].to_f
    ff_ren_ratio = ff/ren

    experiment = Experiment.find(lv['experiment_id'])
    fold_change = ff_ren_ratio/experiment.ff_ren_ratio

    LuciferaseValue.create(firefly: ff, renilla: ren, ff_ren_ratio: ff_ren_ratio, fold_change: fold_change, 
        variant_id: lv['variant_id'], experiment_id: lv['experiment_id'])
end

variants = Variant.all
variants.each do |v|
    luciferase_values = v.luciferase_values.map{|lv| lv.fold_change}
    if !luciferase_values.empty?
        fold_change_total = luciferase_values.reduce(:+)
        avg_fold_change = fold_change_total/luciferase_values.size
        v.update(avg_fold_change: avg_fold_change)
        v.avg_fold_change.to_i > 1 ? v.update(gof: true) : v.update(gof: false)
    end 
end 