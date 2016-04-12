class CreateMemos < ActiveRecord::Migration
  def change
    create_table :memos do |t|
      t.text :content, null: false
      t.boolean :done, null:false, default: false

      t.timestamps null: false
    end
  end
end
