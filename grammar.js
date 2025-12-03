/**
 * @file Qua grammar for tree-sitter
 * @author Gavin Morrow <gavinfmorrow@gmail.com>
 * @license None
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check
//

module.exports = grammar({
  name: "qua",

  word: ($) => $.identifier,
  reserved: {
    default: () => ["let", "if", "else", "true", "false"],
  },
  extras: ($) => [/\s/, $.comment],
  supertypes: ($) => [$.expression, $.statement],

  rules: {
    // TODO: add the actual grammar rules
    source_file: ($) => repeat($.statement),

    statement: ($) => choice($.binding, $.expression_stmt),

    binding: ($) =>
      seq(
        "let",
        $.identifier,
        optional($.binding_args),
        "=",
        $.expression,
        ";",
      ),

    binding_args: ($) =>
      seq("(", repeat(seq($.identifier, ",")), optional($.identifier), ")"),

    expression_stmt: ($) => seq($.expression, ";"),
    expression: ($) =>
      choice(
        $.logic_or,
        $.logic_and,
        $.equality,
        $.comparison,
        $.term,
        $.factor,
        $.unary,
        $.call,
        $._primary,
      ),

    logic_or: ($) => prec(0, prec.left(seq($.expression, "or", $.expression))),
    logic_and: ($) =>
      prec(1, prec.left(seq($.expression, "and", $.expression))),
    equality: ($) =>
      prec(2, prec.left(seq($.expression, choice("==", "!="), $.expression))),
    comparison: ($) =>
      prec(
        3,
        prec.left(
          seq($.expression, choice("<", "<=", ">", ">="), $.expression),
        ),
      ),
    term: ($) =>
      prec(4, prec.left(seq($.expression, choice("+", "-"), $.expression))),
    factor: ($) =>
      prec(5, prec.left(seq($.expression, choice("*", "/"), $.expression))),
    unary: ($) => prec(6, seq(choice("!", "-"), $.expression)),
    call: ($) => prec(7, seq($.expression, $.call_args)),

    call_args: ($) =>
      seq("(", repeat(seq($.expression, ",")), optional($.expression), ")"),

    block: ($) =>
      choice(seq("{", seq(repeat($.statement), optional($.expression)), "}")),

    if_expr: ($) =>
      seq(
        "if",
        $.expression,
        $.block,
        optional(seq("else", choice(seq("if", $.if_expr), $.block))),
      ),
    closure: ($) => prec.right(seq($.binding_args, "=", $.expression)),

    _primary: ($) =>
      prec(
        8,
        choice(
          $.bool,
          $.number,
          $.string,
          $.identifier,
          choice($.block, $.if_expr, $.closure),
        ),
      ),

    bool: () => choice("true", "false"),
    number: () => /[0-9]+(\.[0-9]+)?/,
    string: () => /"[^"]*"/,
    identifier: () => /([a-z]|[A-Z]|_)([a-z]|[A-Z]|[0-9]|_)*/,

    comment: () => token(choice(seq("//", /.*/))),
  },
});
