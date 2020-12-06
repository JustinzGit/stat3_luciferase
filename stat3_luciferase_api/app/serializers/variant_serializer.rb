class VariantSerializer < ActiveModel::Serializer
  attributes :protein_variant, :experiments

  def experiments
    object.experiments.map do |experiment|
      VariantExperimentSerializer.new(experiment, variant: object)
    end
  end
end
