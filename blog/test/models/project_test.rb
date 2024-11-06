require "test_helper"

class ProjectTest < ActiveSupport::TestCase
  test "should save project with valid attributes" do
    project = Project.new(title: "Test Project", description: "This is a valid project description.")
    project.image.attach(io: File.open(Rails.root.join("test", "fixtures", "files", "sample_image.jpg")), filename: "sample_image.jpg")
    assert project.save
  end

  test "should not save project without title" do
    project = Project.new(description: "This project has no title")
    project.image.attach(io: File.open(Rails.root.join("test", "fixtures", "files", "sample_image.jpg")), filename: "sample_image.jpg")
    assert_not project.save
  end

  test "should not save project without description" do
    project = Project.new(title: "Test Project")
    project.image.attach(io: File.open(Rails.root.join("test", "fixtures", "files", "sample_image.jpg")), filename: "sample_image.jpg")
    assert_not project.save
  end

  test "should not save project with description less than 10 characters" do
    project = Project.new(title: "Test Project", description: "Short")
    project.image.attach(io: File.open(Rails.root.join("test", "fixtures", "files", "sample_image.jpg")), filename: "sample_image.jpg")
    assert_not project.save
  end

  test "should save project with description of at least 10 characters" do
    project = Project.new(title: "Test Project", description: "Valid description of sufficient length.")
    project.image.attach(io: File.open(Rails.root.join("test", "fixtures", "files", "sample_image.jpg")), filename: "sample_image.jpg")
    assert project.save
  end

  test "should save project with image" do
    project = Project.new(title: "Test Project with Image", description: "A project with an image attached.")
    project.image.attach(io: File.open(Rails.root.join("test", "fixtures", "files", "sample_image.jpg")), filename: "sample_image.jpg")
    assert project.save
  end

  test "should not save project without image" do
    project = Project.new(title: "Test Project without Image", description: "This project does not have an image.")
    assert_not project.save
  end
end
