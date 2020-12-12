class VariantSerializer < ActiveModel::Serializer
  attributes :protein_variant, :avg_fold_change, :gof, :experiments

  def experiments
    object.experiments.map do |experiment|
      VariantExperimentSerializer.new(experiment, variant: object)
    end
  end
end
