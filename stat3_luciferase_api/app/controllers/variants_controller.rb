class VariantsController < ApplicationController
  before_action :set_variant, only: [:show, :update, :destroy]

  # GET /variants
  def index
    @variants = Variant.all

    render json: @variants, except: [:created_at, :updated_at]
  end

  # GET /variants/1
  def show
    render json: @variant
  end

  # POST /variants
  def create
    @variant = Variant.new(variant_params)

    if @variant.save
      render json: @variant, status: :created, location: @variant
    else
      render json: @variant.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /variants/1
  def update
    if @variant.update(variant_params)
      render json: @variant
    else
      render json: @variant.errors, status: :unprocessable_entity
    end
  end

  # DELETE /variants/1
  def destroy
    @variant.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_variant
      @variant = Variant.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def variant_params
      params.require(:variant).permit(:protein_variant, :wt_amino_acid, :mt_amino_acid, :aa_position, :gof)
    end
end
