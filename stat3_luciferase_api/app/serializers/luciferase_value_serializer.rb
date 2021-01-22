class LuciferaseValueSerializer < ActiveModel::Serializer
  attributes :id, :firefly, :renilla, :ff_ren_ratio, :fold_change

  def variant
    variant = Variant.find(self.object.variant_id)
    variant.protein_variant
  end

  def ff_ren_ratio
    "#{'%.2f' % object.ff_ren_ratio}".to_f
  end 

  def fold_change
    "#{'%.2f' % object.fold_change}".to_f
  end 
end
