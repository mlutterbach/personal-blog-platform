class Project < ApplicationRecord
  has_one_attached :image
  validates :title, presence: true
  validates :description, presence: true, length: { minimum: 10 }
end
