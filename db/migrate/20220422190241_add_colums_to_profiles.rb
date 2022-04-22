class AddColumsToProfiles < ActiveRecord::Migration[6.1]
  def change
    add_column :profiles, :first_name, :string
    add_column :profiles, :last_name, :string
    rename_column :profiles, :profile_avatar, :profile_photo
  end
end
