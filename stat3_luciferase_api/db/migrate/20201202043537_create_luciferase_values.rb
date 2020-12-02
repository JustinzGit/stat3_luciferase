class CreateLuciferaseValues < ActiveRecord::Migration[6.0]
  def change
    create_table :luciferase_values do |t|
      t.integer :firefly
      t.integer :renilla
      t.integer :variant_id
      t.integer :experiment_id

      t.timestamps
    end
  end
end
