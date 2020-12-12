class AddColumnsToExperimentsAndLuciferaseValues < ActiveRecord::Migration[6.0]
  def change
    add_column :experiments, :ff_ren_ratio, :float
    add_column :luciferase_values, :ff_ren_ratio, :float
    add_column :luciferase_values, :fold_change, :float
  end
end
