class ExperimentsController < ApplicationController

  # GET /experiments
  def index
    @experiments = Experiment.all.order(date: :desc)
    render json: @experiments
  end

  # GET /experiments/1
  def show
    @experiment = Experiment.find_by(date: params[:date])
    render json: @experiment
  end

  # POST /experiments
  def create
    @experiment = Experiment.new(experiment_params)
    @experiment.calculate_ff_ren_ratio

    @experiment.luciferase_values.build(luciferase_values_params)
    @experiment.calculate_fold_changes

    if @experiment.valid?
      @experiment.save
      render json: @experiment, status: :created, location: @experiment
    else
      render json: @experiment.errors, status: :unprocessable_entity
    end
  end

  # # PATCH/PUT /experiments/1
  # def update
  #   if @experiment.update(experiment_params)
  #     render json: @experiment
  #   else
  #     render json: @experiment.errors, status: :unprocessable_entity
  #   end
  # end

  # # DELETE /experiments/1
  # def destroy
  #   @experiment.destroy
  # end

  private
    # Only allow a trusted parameter "white list" through.
    def experiment_params
      params.require(:experiment).permit(:date, :wt_firefly, :wt_renilla)
    end

    def luciferase_values_params
      params.permit(luciferase_values: [:variant_id, :firefly, :renilla]).require(:luciferase_values)
    end 
end
