class LuciferaseValueSerializer < ActiveModel::Serializer
  attributes :firefly, :renilla, :ff_ren_ratio, :fold_change

  def variant
    variant = Variant.find(self.object.variant_id)
    variant.protein_variant
  end 
end
