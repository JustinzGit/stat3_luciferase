class LuciferaseValuesController < ApplicationController
  before_action :set_luciferase_value, only: [:show, :update, :destroy]

  # GET /luciferase_values
  def index
    @luciferase_values = LuciferaseValue.all

    render json: @luciferase_values
  end

  # GET /luciferase_values/1
  def show
    render json: @luciferase_value
  end

  # POST /luciferase_values
  def create
    @luciferase_value = LuciferaseValue.new(luciferase_value_params)

    if @luciferase_value.save
      render json: @luciferase_value, status: :created, location: @luciferase_value
    else
      render json: @luciferase_value.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /luciferase_values/1
  def update
    if @luciferase_value.update(luciferase_value_params)
      render json: @luciferase_value
    else
      render json: @luciferase_value.errors, status: :unprocessable_entity
    end
  end

  # DELETE /luciferase_values/1
  def destroy
    @luciferase_value.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_luciferase_value
      @luciferase_value = LuciferaseValue.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def luciferase_value_params
      params.require(:luciferase_value).permit(:firefly, :renilla, :variant_id, :experiment_id)
    end
end
