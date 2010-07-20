class Project < Sequel::Model
  many_to_many :projects
end