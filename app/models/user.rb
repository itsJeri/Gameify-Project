class User < ApplicationRecord
  has_secure_password
  has_many :scores
  has_many :games, through: :scores

  validates :username, presence: true, uniqueness: true
  validates :password_digest, presence: true
end
