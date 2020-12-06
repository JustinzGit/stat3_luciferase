class LuciferaseValueSerializer < ActiveModel::Serializer
  attributes :firefly, :renilla

  def variant
    variant = Variant.find(self.object.variant_id)
    variant.protein_variant
  end 
end
