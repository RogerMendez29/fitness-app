class ChangeExerciseColumnName < ActiveRecord::Migration[6.1]
  def change
    rename_column :exercises, :type, :category
  end
end
