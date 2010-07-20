require File.join(File.dirname(__FILE__), '..', 'config', 'boot')

DB.create_table :users do
  primary_key :id
  column :email_address, :string
  column :public_key, :text
  column :private_key, :text
end

DB.create_table :projects do
  primary_key :id
  column :data, :text # JSON obj
end

DB.create_table :project_groups do
  foreign_key :users
  foreign_key :projects
  column :owner, :boolean, :default => true
end