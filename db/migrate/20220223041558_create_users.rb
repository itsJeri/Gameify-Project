class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    # enable citext for case insensitive usernames and emails
    enable_extension(:citext)
    create_table :users do |t|
      t.citext :username
      t.index :username, unique: true
      t.string :password_digest
      t.citext :email
      t.index :email, unique: true

      t.timestamps
    end
  end
end
