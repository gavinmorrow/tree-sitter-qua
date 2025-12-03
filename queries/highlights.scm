[ "let" "if" "else" ] @keyword

[ "{" "}" "(" ")" ] @punctuation.bracket
[ "," ] @punctuation.delimiter

; Constants
(number) @number
(string) @string

(identifier) @variable
(comment) @comment

(binding (pattern (identifier) @function (binding_args)))
(binding_args (identifier) @variable.parameter)

((identifier) @constructor
  (#match? @constructor "^[A-Z].*"))

((identifier) @function.builtin
  (#eq? @function.builtin "print"))

; For Helix
[ "if" "else" ] @keyword.control.conditional
[ "let" ] @keyword.storage.type
(number) @constant.numeric
