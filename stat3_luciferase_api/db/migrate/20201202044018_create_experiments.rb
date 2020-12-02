class CreateExperiments < ActiveRecord::Migration[6.0]
  def change
    create_table :experiments do |t|
      t.string :date
      t.integer :wt_firefly
      t.integer :wt_renilla

      t.timestamps
    end
  end
end
