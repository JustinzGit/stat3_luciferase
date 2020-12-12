class ChangeColumnDataTypeToFloat < ActiveRecord::Migration[6.0]
  def change
    change_column :experiments, :wt_firefly, :float
    change_column :experiments, :wt_renilla, :float
    change_column :luciferase_values, :firefly, :float
    change_column :luciferase_values, :renilla, :float
  end
end
