/**
 * @file Qua grammar for tree-sitter
 * @author Gavin Morrow <gavinfmorrow@gmail.com>
 * @license None
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "qua",

  word: ($) => $.identifier,
  reserved: {
    default: () => ["let", "if", "else", "true", "false"],
  },
  extras: ($) => [/\s/, $.comment],
  conflicts: ($) => [[$.unary, $.call, $.if_expr], [$.if_expr]],

  rules: {
    // TODO: add the actual grammar rules
    source_file: ($) => repeat($._statement),

    _statement: ($) =>
      choice(seq("let", $.binding, ";"), seq($._expression, ";")),

    binding: ($) =>
      seq($.identifier, optional($._binding_args), "=", $._expression),

    _binding_args: ($) =>
      seq("(", repeat(seq($.identifier, ",")), optional($.identifier), ")"),

    _expression: ($) =>
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

    logic_or: ($) => prec(0, seq($._expression, "or", $._expression)),
    logic_and: ($) => prec(1, seq($._expression, "and", $._expression)),
    equality: ($) =>
      prec(2, seq($._expression, choice("==", "!="), $._expression)),
    comparison: ($) =>
      prec(3, seq($._expression, choice("<", "<=", ">", ">="), $._expression)),
    term: ($) => prec(4, seq($._expression, choice("+", "-"), $._expression)),
    factor: ($) => prec(5, seq($._expression, choice("*", "/"), $._expression)),
    unary: ($) => prec(6, seq(choice("!", "-", $._expression))),
    call: ($) => prec(7, seq($._expression, $._call_arguments)),

    _call_arguments: ($) =>
      seq("(", repeat(seq($._expression, ",")), optional($._expression), ")"),

    block: ($) =>
      choice(
        seq("{", seq(repeat($._statement), optional($._expression)), "}"),
        $.if_expr,
        $.closure,
      ),

    if_expr: ($) =>
      seq("if", $._expression, $.block, optional(seq("else", $.block))),
    closure: ($) => seq($._binding_args, "=", $._expression),

    _primary: ($) =>
      prec(8, choice($.bool, $.number, $.string, $.identifier, $.block)),

    bool: () => choice("true", "false"),
    number: () => /[0-9]+(\.[0-9]+)?/,
    string: () => /"[^"]*"/,
    identifier: () => /([a-z]|[A-Z]|_)([a-z]|[A-Z]|[0-9]|_)*/,

    comment: () => /\/\/.*\$/,
  },
});
