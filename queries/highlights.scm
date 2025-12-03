[ "let" "if" "else" ] @keyword

[ "{" "}" ] @punctuation.bracket
[ "," ] @punctuation.delimiter

(number) @number
(string) @string
(bool) @bool
(identifier) @variable
(comment) @comment

(binding (identifier) @function (binding_args))
(binding_args (identifier) @variable.parameter)
(call (identifier) @function)

((identifier) @constructor
  (#match? @constructor "^[A-Z].*"))

((identifier) @function.builtin
  (#eq? @function.builtin "print"))
