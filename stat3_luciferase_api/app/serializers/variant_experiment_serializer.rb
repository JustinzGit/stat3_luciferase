class VariantExperimentSerializer < ActiveModel::Serializer
  attributes :id, :date, :wt_firefly, :wt_renilla, :ff_ren_ratio, :luciferase_values

  def luciferase_values
    luciferase_value = object.luciferase_values.where(variant_id: @instance_options[:variant].id).map do |luciferase_value|
      LuciferaseValueSerializer.new(luciferase_value)
    end
    luciferase_value.first
  end

  def ff_ren_ratio
    "#{'%.2f' % object.ff_ren_ratio}".to_f
  end 
end
