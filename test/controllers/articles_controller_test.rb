require "test_helper"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @article = articles(:one)
  end

  teardown do
    Rails.cache.clear
  end

  test "should get index" do
    get articles_url
    assert_response :success
  end

  test "should show article" do
    get article_url(@article)
    assert_response :success
  end

  test "should create article" do
    assert_difference("Article.count") do
      post articles_url, params: { article: { title: "Some title", content:"Content of article" } }
    end

    assert_response :success
  end

  test "should update article" do
    patch article_url(@article), params: { article: { title: "updated" } }

    @article.reload
    assert_equal "updated", @article.title
  end

  test "should destroy article" do
    assert_difference("Article.count", -1) do
      delete article_url(@article)
    end
  end
end
