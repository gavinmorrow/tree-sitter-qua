(binding (pattern (binding_args)) (_) @function.inside) @function.around
(closure (binding_args) (_) @function.inside) @function.around

(binding_args ((_) @parameter.inside . ","? @parameter.around) @parameter.around)
(call_args ((_) @parameter.inside . ","? @parameter.around) @parameter.around)

(comment) @comment.inside
(comment)+ @comment.around
