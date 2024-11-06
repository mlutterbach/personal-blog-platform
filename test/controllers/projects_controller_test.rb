require "test_helper"

class ProjectsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:one)
    @project = projects(:one)
    @headers = { 'Authorization' => "Bearer #{@user.generate_token}" }

    @project.image.attach(io: File.open(Rails.root.join('test', 'fixtures', 'files', 'sample_image.jpg')), filename: 'sample_image.jpg', content_type: 'image/jpg')
  end

  test "should get index" do
    get projects_url, headers: @headers
    assert_response :success
    assert_includes response.body, "First Project"
  end

  test "should create project with valid data" do
    assert_difference('Project.count', 1) do
      post projects_url, params: { project: { title: "New Project", description: "Project description", project_link: "http://example.com", github_url: "http://github.com", image: fixture_file_upload('test/fixtures/files/sample_image.jpg', 'image/jpg') } }, headers: @headers
    end
    assert_response :created
    assert_includes response.body, "New Project"
  end

  test "should not create project without title" do
    post projects_url, params: { project: { description: "Project description", project_link: "http://example.com", github_url: "http://github.com", image: fixture_file_upload('test/fixtures/files/sample_image.jpg', 'image/jpg') } }, headers: @headers
    assert_response :unprocessable_entity
    assert_includes response.body, "{\"title\":[\"can't be blank\"]}"
  end

  test "should not create project without image" do
    post projects_url, params: { project: { title: "New Project", description: "Project description", project_link: "http://example.com", github_url: "http://github.com" } }, headers: @headers
    assert_response :unprocessable_entity
    assert_includes response.body, "{\"image\":[\"can't be blank\"]}"
  end

  test "should update project with valid data" do
    patch project_url(@project), params: { project: { title: "Updated Project", description: "Updated description", project_link: "http://updated.com", github_url: "http://github.com/updated" } }, headers: @headers
    assert_response :success
    assert_includes response.body, "Updated Project"
  end

  test "should not update project with invalid data" do
    patch project_url(@project), params: { project: { title: "", description: "Updated description", project_link: "http://updated.com", github_url: "http://github.com/updated" } }, headers: @headers
    assert_response :unprocessable_entity
    assert_includes response.body, "{\"title\":[\"can't be blank\"]}"
  end

  test "should destroy project" do
    assert_difference('Project.count', -1) do
      delete project_url(@project), headers: @headers
    end
    assert_response :no_content
  end
end
