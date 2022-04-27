class EditCalenderColumns < ActiveRecord::Migration[6.1]
  def change
    add_column :calenders, :title, :string
    # change_column :calenders, :start_date, :datetime 
    # USING start_date::datetime without time zone
    # # change_column :calenders, :end_date, :datetime
    # # USING end_date::datetime without time zone



  end
end
