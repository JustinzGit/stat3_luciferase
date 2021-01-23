class ExperimentsController < ApplicationController

  # GET /experiments
  def index
    @experiments = Experiment.all.order(date: :desc)
    render json: @experiments
  end

  # GET /experiments/1
  def show
    @experiment = Experiment.find(params[:id])
    render json: @experiment
  end

  # POST /experiments
  def create
    @experiment = Experiment.new(experiment_params)
  
    if @experiment.valid?
      @experiment.save
      render json: @experiment, status: :created, location: @experiment
    else
      render json: {
        error: @experiment.errors.full_messages,
        status: 422
      }
    end
  end

  # PATCH/PUT /experiments/1
  def update
    @experiment = Experiment.find(params[:id])
    @experiment.destroy
    @experiment = Experiment.new(experiment_params)

    if @experiment.valid?
      @experiment.save
      render json: @experiment
    else
      render json: {
        error: @experiment.errors.full_messages,
        status: 422
      }
    end
  end

  # DELETE /experiments/1
  def destroy
    @experiment = Experiment.find(params[:id])
    @experiment.destroy
  end

  private
    # Only allow a trusted parameter "white list" through.
    def experiment_params
      params.permit(:id, :date, :wt_firefly, :wt_renilla, :ff_ren_ratio, 
        luciferase_values_attributes: [:id, :variant_id, :firefly, :renilla, :ff_ren_ratio, :fold_change])
    end
end
