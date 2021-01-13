class ExperimentSerializer < ActiveModel::Serializer
  attributes :id, :date, :wt_firefly, :wt_renilla, :ff_ren_ratio, :variants

  def ff_ren_ratio
    "#{'%.2f' % object.ff_ren_ratio}".to_f
  end 
  
  def variants
    self.object.variants.map do |variant|
      ExperimentVariantSerializer.new(variant, experiment: object)
    end 
  end 
end
