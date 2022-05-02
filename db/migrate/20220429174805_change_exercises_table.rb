class ChangeExercisesTable < ActiveRecord::Migration[6.1]
  def change
    add_column :exercises, :bodypart, :string
    rename_column :exercises, :difficulty, :equipment
    rename_column :exercises, :description, :gif_url
    rename_column :exercises, :category, :target

    

  end
end
