class EditCalenderColumns < ActiveRecord::Migration[6.1]
  def change
    add_column :calenders, :title, :string
    
    



  end
end
