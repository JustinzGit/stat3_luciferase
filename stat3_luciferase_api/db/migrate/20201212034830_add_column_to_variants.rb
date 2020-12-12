class AddColumnToVariants < ActiveRecord::Migration[6.0]
  def change
    add_column :variants, :avg_fold_change, :float
  end
end
