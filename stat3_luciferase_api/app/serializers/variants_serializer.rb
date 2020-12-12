class VariantsSerializer < ActiveModel::Serializer
    attributes :id, :gof, :protein_variant, :avg_fold_change, :aa_position

    def avg_fold_change
      "#{'%.2f' % object.avg_fold_change}".to_f
    end  
end