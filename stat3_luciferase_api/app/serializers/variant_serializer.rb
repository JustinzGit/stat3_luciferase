class VariantSerializer < ActiveModel::Serializer
  attributes :id, :gof, :protein_variant, :avg_fold_change, :aa_position

  # def experiments
  #   object.experiments.map do |experiment|
  #     VariantExperimentSerializer.new(experiment, variant: object)
  #   end
  # end

  def avg_fold_change
    "#{'%.2f' % object.avg_fold_change}"
  end 
end
