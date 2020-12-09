class ExperimentVariantSerializer < ActiveModel::Serializer
  attributes :protein_variant, :luciferase_values

  def luciferase_values
    luciferase_value = object.luciferase_values.where(experiment_id: @instance_options[:experiment].id).map do |luciferase_value|
      LuciferaseValueSerializer.new(luciferase_value)
    end
    luciferase_value.first
  end 
end
