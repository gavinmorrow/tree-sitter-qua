import XCTest
import SwiftTreeSitter
import TreeSitterQua

final class TreeSitterQuaTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_qua())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Qua grammar")
    }
}
