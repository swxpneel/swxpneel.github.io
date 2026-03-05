#sourceLocation(file: "-e", line: 1)
import PDFKit; import Foundation; let url = URL(fileURLWithPath: "public/resume.pdf", relativeTo: URL(fileURLWithPath: FileManager.default.currentDirectoryPath)); if let doc = PDFDocument(url: url) { for i in 0..<doc.pageCount { if let page = doc.page(at: i), let text = page.string { print(text) } } }
