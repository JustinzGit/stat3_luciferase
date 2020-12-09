class ChangeColumnDataTypeToDate < ActiveRecord::Migration[6.0]
  def change
    change_column :experiments, :date, :date
  end
end
