class ArticlesController < ApplicationController
  before_action :set_article, only: %w[show edit update destroy]
  # GET /articles
  def index
    @articles = Article.all
    @articles = Article.where('tags LIKE ?', "%#{params[:tags]}%") if params[:tags]
    render json: @articles
  end

  # GET /articles/:id
  def show
    render json: @article
  end

  # GET /articles/new
  def new
    @article = Article.new
  end

  # POST /articles
  def create
    @article = Article.new(article_params)

    if @article.save
      render json: @article, status: :created
    else
      render json: @article.errors, status: :unprocessable_entity
    end
  end

  # GET /articles/:id/edit
  def edit
  end

  # PATCH/PUT /articles/:id
  def update
    if @article.update(article_params)
      render json: @article
    else
      render json: @article.errors, status: :unprocessable_entity
    end
  end

  # Delete /articles/:id
  def destroy
    @article.destroy
    head :no_content
  end

  private

  def set_article
    @article = Article.find(params[:id])
  end

  def article_params
    params.require(:article).permit(:title, :content, :tags)
  end
end
