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
    @experiment.luciferase_values.build(luciferase_values_params)
    @experiment.set_ratios_and_fold_changes
  
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
    params = experiment_params
    @experiment = Experiment.find(params[:id])
    updated_params = @experiment.perform_lv_calculations(params)
    @experiment.update(updated_params)

    if @experiment
      render json: @experiment
    else
      render json: @experiment.errors, status: :unprocessable_entity
    end
  end

  # # DELETE /experiments/1
  # def destroy
  #   @experiment.destroy
  # end

  private
    # Only allow a trusted parameter "white list" through.
    def experiment_params
      params.permit(experiment: [:id, :date, :wt_firefly, :wt_renilla, luciferase_values_attributes: [:id, :variant_id, :firefly, :renilla, :ff_ren_ratio, :fold_change]]).require(:experiment)
    end

    def luciferase_values_params
      params.permit(luciferase_values: [:id, :variant_id, :firefly, :renilla]).require(:luciferase_values)
    end 
end
