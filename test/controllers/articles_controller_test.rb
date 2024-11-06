require 'test_helper'

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    @headers = { 'Authorization' => "Bearer #{@user.generate_token}" }
    @article = articles(:one)
  end

  test "should get index" do
    get articles_url, headers: @headers
    assert_response :success
    assert_includes response.body, "First Article"
    assert_includes response.body, "Second Article"
  end

  test "should get filtered index by tag" do
    get articles_url, params: { tags: 'tag1' }, headers: @headers
    assert_response :success
    assert_includes response.body, "First Article"
    refute_includes response.body, "Second Article"
  end

  test "should show article" do
    get article_url(@article), headers: @headers
    json_response = JSON.parse(@response.body)
    assert_response :success
    assert_equal @article.title, json_response["title"]
  end

  test "should not create article without title" do
    post articles_url, params: { article: { content: "Some content", tags: "tag1" } }, headers: @headers
    assert_response :unprocessable_entity
    assert_includes response.body, "{\"title\":[\"can't be blank\"]}"
  end

  test "should create article with valid data" do
    post articles_url, params: { article: { title: "New Article", content: "This is a valid article", tags: "test" } }, headers: @headers
    json_response = JSON.parse(@response.body)
    assert_response :created
    assert_equal "New Article", json_response["title"]
    assert_equal "This is a valid article", json_response["content"]
  end

  test "should update article with valid data" do
    patch article_url(@article), params: { article: { title: "Updated Title", content: "Updated content", tags: "updated" } }, headers: @headers
    json_response = JSON.parse(@response.body)
    assert_response :success
    assert_equal "Updated Title", json_response["title"]
    assert_equal "Updated content", json_response["content"]
  end

  test "should not update article with invalid data" do
    article = articles(:one)
    patch article_url(article), params: { article: { title: "", content: "Updated content", tags: "tag1" } }, headers: @headers
    assert_response :unprocessable_entity
    assert_includes response.body, "{\"title\":[\"can't be blank\"]}"
  end

  test "should destroy article" do
    assert_difference('Article.count', -1) do
      delete article_url(@article), headers: @headers
    end
    assert_response :no_content
  end
end
