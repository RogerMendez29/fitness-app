class AddColumnToCalenders < ActiveRecord::Migration[6.1]
  def change

    add_column :calenders, :end_date, :string
    change_column :calenders, :date, :string

    rename_column :calenders, :date, :start_date


  end
end
