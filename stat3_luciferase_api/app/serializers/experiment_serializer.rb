class ExperimentSerializer < ActiveModel::Serializer
  attributes :date, :wt_firefly, :wt_renilla
  attribute :luciferase_values

  def luciferase_values
    luciferase_value = object.luciferase_values.where(variant_id: @instance_options[:variant].id).map do |luciferase_value|
      LuciferaseValueSerializer.new(luciferase_value)
    end
    luciferase_value.first
  end 
end
