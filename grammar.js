/**
 * @file Qua grammar for tree-sitter
 * @author Gavin Morrow <gavinfmorrow@gmail.com>
 * @license None
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "qua",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
