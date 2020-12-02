class ExperimentsController < ApplicationController
  before_action :set_experiment, only: [:show, :update, :destroy]

  # GET /experiments
  def index
    @experiments = Experiment.all

    render json: @experiments
  end

  # GET /experiments/1
  def show
    render json: @experiment
  end

  # POST /experiments
  def create
    @experiment = Experiment.new(experiment_params)

    if @experiment.save
      render json: @experiment, status: :created, location: @experiment
    else
      render json: @experiment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /experiments/1
  def update
    if @experiment.update(experiment_params)
      render json: @experiment
    else
      render json: @experiment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /experiments/1
  def destroy
    @experiment.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_experiment
      @experiment = Experiment.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def experiment_params
      params.require(:experiment).permit(:date, :wt_firefly, :wt_renilla)
    end
end
