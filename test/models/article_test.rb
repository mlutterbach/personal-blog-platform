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

  test "should save article with screenshots" do
    article = Article.new(title: "Article with Screenshot", content: "This is an article with an attached screenshot.")
    article.screenshots.attach(io: File.open(Rails.root.join('test', 'fixtures', 'files', 'sample_image.jpg')), filename: 'sample_image.jpg', content_type: 'image/jpg')
    assert article.save
  end

  test "should save article without screenshots" do
    article = Article.new(title: "Article without Screenshot", content: "This is an article without an attached screenshot.")
    assert article.save
  end

  test "should save article with multiple screenshots" do
    article = Article.new(title: "Article with Multiple Screenshots", content: "This article has two attached screenshots.")

    article.screenshots.attach(io: File.open(Rails.root.join('test', 'fixtures', 'files', 'sample_image.jpg')), filename: 'sample_image_1.jpg', content_type: 'image/jpg')
    article.screenshots.attach(io: File.open(Rails.root.join('test', 'fixtures', 'files', 'sample_image.jpg')), filename: 'sample_image_2.jpg', content_type: 'image/jpg')

    assert article.save

    assert_equal 2, article.screenshots.count
  end
end
