class Profile < ApplicationRecord
    has_one :user
    has_many :personal_records
end
