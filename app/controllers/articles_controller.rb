class ArticlesController < ApplicationController
  include ActiveStorage::SetCurrent
  before_action :authenticate_user!, only: [:create, :edit, :update, :destroy]
  before_action :set_article, only: %w[show edit update destroy]

  # GET /articles
  def index
    @articles = Article.order(created_at: :desc)
    @articles = @articles.where('tags LIKE ?', "%#{params[:tags]}%") if params[:tags]

    render json: @articles.as_json(include: { screenshots: { methods: :url } })
  end

  # GET /articles/:id
  def show
    render json: @article.as_json(include: { screenshots: { methods: :url } })
  end

  # GET /articles/new
  def new
    @article = Article.new
  end

  # POST /articles
  def create
    @article = Article.new(article_params)

    if @article.save
      render json: @article.as_json(include: { screenshots: { methods: :url } }), status: :created
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
      render json: @article.as_json(include: { screenshots: { methods: :url } })
    else
      render json: @article.errors, status: :unprocessable_entity
    end
  end

  # DELETE /articles/:id
  def destroy
    @article.destroy
    head :no_content
  end

  private

  def set_article
    @article = Article.includes(screenshots_attachments: :blob).find(params[:id])
  end

  def article_params
    params.require(:article).permit(:title, :content, :tags, screenshots: [])
  end
end
