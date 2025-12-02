package tree_sitter_qua_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_qua "github.com/gavinmorrow/tree-sitter-qua/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_qua.Language())
	if language == nil {
		t.Errorf("Error loading Qua grammar")
	}
}
