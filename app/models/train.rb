class Train < ApplicationRecord

    belongs_to :trainer, :class_name: 'User'
    belongs_to :trainee, :class_name: 'User'

    validates :trainer_id, uniqueness: { scope: :trainee_id }
    validates :trainee_id, uniqueness: { scope: :trainer_id }

end
