import { getParsedDoc, markdownToHtml, splitIntoSections } from '@/lib/parse-docs'
import DocsClient from './DocsClient'

export const dynamic = 'force-static'

export default function DocsPage() {
  const { navSections, meta, searchItems, rawContent } = getParsedDoc()

  const sections = splitIntoSections(rawContent)

  const renderedSections = sections.map((section) => {
    const html = markdownToHtml(section.rawContent)
    return {
      id: section.id,
      number: section.number,
      title: section.title,
      htmlContent: html,
      mermaidBlocks: section.mermaidBlocks,
    }
  })

  return (
    <DocsClient
      navSections={navSections}
      meta={meta}
      searchItems={searchItems}
      sections={renderedSections}
    />
  )
}
