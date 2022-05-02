class ChangeStringToDateTime < ActiveRecord::Migration[6.1]
  def change

    add_column :calenders, :start, :datetime
    add_column :calenders, :end, :datetime
    remove_column :calenders, :start_date
    remove_column :calenders, :end_date


  end
end
