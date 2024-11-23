class ProjectsController < ApplicationController
  include ActiveStorage::SetCurrent
  before_action :authenticate_user!, only: [:create, :edit, :update, :destroy]
  before_action :set_project, only: %w[show edit update destroy]

  # GET /projects
  def index
    @projects = Project.all

    render json: @projects.as_json(include: { image: { methods: :url } })
  end

  # GEt /projects/:id
  def show
    render json: @project.as_json(include: { image: { methods: :url } })
  end

  # GET /projects/new
  def new
    @project = Project.new
  end

  # POST /projects
  def create
    @project = Project.new(project_params)

    if @project.save
      render json: @project.as_json(include: { image: { methods: :url } }), status: :created
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  # GET /projects/:id/edit
  def edit
  end

  # PATCH/PUT /projects/:id
  def update
    if @project.update(project_params)
      render json: @project.as_json(include: { image: { methods: :url } })
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  # DELETE /projects/:id
  def destroy
    @project.destroy
    head :no_content
  end

  private

  def set_project
    @project = Project.includes(image_attachment: :blob).find(params[:id])
  end

  def project_params
    params.require(:project).permit(:title, :description, :project_link, :github_url, :image)
  end
end
