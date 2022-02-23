class CreateScores < ActiveRecord::Migration[7.0]
  def change
    create_table :scores do |t|
      t.integer :score

      t.belongs_to :user
      t.belongs_to :game

      t.timestamps
    end
  end
end
