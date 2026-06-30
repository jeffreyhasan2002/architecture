export interface NavSection {
  id: string
  title: string
  level: number
  children: NavSection[]
}

export interface ParsedSection {
  id: string
  title: string
  level: number
  rawContent: string
  htmlContent: string
  mermaidDiagrams: MermaidBlock[]
  subsections: ParsedSection[]
}

export interface MermaidBlock {
  id: string
  code: string
  placeholder: string
}

export interface SearchItem {
  id: string
  title: string
  content: string
  sectionId: string
}

export interface DocMeta {
  version: string
  lastUpdated: string
  classification: string
}
