class ExperimentSerializer < ActiveModel::Serializer
  attributes :id, :date, :wt_firefly, :wt_renilla, :variants

  def variants
    self.object.variants.map do |variant|
      ExperimentVariantSerializer.new(variant, experiment: object)
    end 
  end 
end
