class CreateProjects < ActiveRecord::Migration[7.2]
  def change
    create_table :projects do |t|
      t.string :title
      t.text :description
      t.string :project_link
      t.string :github_url

      t.timestamps
    end
  end
end
