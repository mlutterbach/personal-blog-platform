require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  test "should not save article without title" do
    article = Article.new
    assert_not article.save
  end

  test "should not save article without content" do
    article = Article.new(title: "New Article")
    assert_not article.save
  end

  test "should not save article with content length less than 10 char" do
    article = Article.new(title: "New Article", content: "Short")
    assert_not article.save
  end

  test "should save article with title, content" do
    article = Article.new(title: "New Article", content: "The content of this article")
    assert article.save
  end
end
