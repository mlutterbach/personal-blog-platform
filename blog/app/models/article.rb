class Article < ApplicationRecord
  has_many_attached :screenshots
  validates :title, presence: true
  validates :content, presence: true, length: { minimum: 10 }
end
