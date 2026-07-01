type EditorJsonMark = {
  type?: string
  attrs?: Record<string, unknown>
}

type EditorJsonNode = {
  type?: string
  text?: string
  attrs?: Record<string, unknown>
  marks?: EditorJsonMark[]
  content?: EditorJsonNode[]
}

export type NoticeInlineMark =
  | { type: "bold" }
  | { type: "italic" }
  | { type: "underline" }
  | { type: "strike" }
  | { type: "code" }
  | { type: "superscript" }
  | { type: "subscript" }
  | { type: "link"; href: string; target?: string | null }

export type NoticeInlineContent =
  | { type: "text"; text: string; marks: NoticeInlineMark[] }
  | { type: "hardBreak" }

export type NoticeContentBlock =
  | { type: "paragraph"; content: NoticeInlineContent[] }
  | { type: "heading"; level: 1 | 2 | 3; content: NoticeInlineContent[] }
  | { type: "blockquote"; content: NoticeContentBlock[] }
  | { type: "codeBlock"; text: string; language?: string | null }
  | { type: "bulletList"; items: NoticeContentBlock[][] }
  | { type: "orderedList"; items: NoticeContentBlock[][]; start: number }
  | { type: "taskList"; items: { checked: boolean; content: NoticeContentBlock[] }[] }
  | { type: "horizontalRule" }
  | { type: "imageBlock"; src: string; alt: string; caption: string; align: "left" | "center" | "right"; width: number | null }
  | { type: "imageRow"; images: Extract<NoticeContentBlock, { type: "imageBlock" }>[] }
  | { type: "table"; rows: { cells: { header: boolean; content: NoticeContentBlock[]; colspan: number; rowspan: number }[] }[] }
  | { type: "unknown"; text: string }

const emptyEditorContent: EditorJsonNode = {
  type: "doc",
  content: [{type: "paragraph"}],
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

const asNode = (value: unknown): EditorJsonNode => {
  return isRecord(value) ? value as EditorJsonNode : emptyEditorContent
}

const parseEditorContent = (value: string | null | undefined): EditorJsonNode => {
  if (!value) return emptyEditorContent

  try {
    return asNode(JSON.parse(value))
  } catch {
    return {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [{type: "text", text: value}],
        },
      ],
    }
  }
}

const toStringValue = (value: unknown): string => {
  return typeof value === "string" ? value : ""
}

const toNumberValue = (value: unknown): number | null => {
  return typeof value === "number" && Number.isFinite(value) ? value : null
}

const normalizeMarks = (marks: EditorJsonMark[] | undefined): NoticeInlineMark[] => {
  if (!Array.isArray(marks)) return []

  return marks.flatMap((mark): NoticeInlineMark[] => {
    switch (mark.type) {
      case "bold":
        return [{type: "bold" as const}]
      case "italic":
        return [{type: "italic" as const}]
      case "underline":
        return [{type: "underline" as const}]
      case "strike":
        return [{type: "strike" as const}]
      case "code":
        return [{type: "code" as const}]
      case "superscript":
        return [{type: "superscript" as const}]
      case "subscript":
        return [{type: "subscript" as const}]
      case "link": {
        const href = toStringValue(mark.attrs?.href)
        if (!href) return []
        return [{type: "link" as const, href, target: typeof mark.attrs?.target === "string" ? mark.attrs.target : null}]
      }
      default:
        return []
    }
  })
}

const normalizeInline = (nodes: EditorJsonNode[] | undefined): NoticeInlineContent[] => {
  if (!Array.isArray(nodes)) return []

  return nodes.flatMap(node => {
    if (node.type === "text") {
      return [{
        type: "text" as const,
        text: node.text ?? "",
        marks: normalizeMarks(node.marks),
      }]
    }

    if (node.type === "hardBreak") {
      return [{type: "hardBreak" as const}]
    }

    return normalizeInline(node.content)
  })
}

const collectText = (node: EditorJsonNode): string => {
  if (node.type === "text") return node.text ?? ""
  if (!Array.isArray(node.content)) return ""
  return node.content.map(collectText).join(node.type === "hardBreak" ? "\n" : "")
}

const normalizeListItems = (nodes: EditorJsonNode[] | undefined): NoticeContentBlock[][] => {
  if (!Array.isArray(nodes)) return []

  return nodes
    .filter(node => node.type === "listItem")
    .map(node => normalizeBlocks(node.content))
}

const normalizeTaskItems = (nodes: EditorJsonNode[] | undefined): { checked: boolean; content: NoticeContentBlock[] }[] => {
  if (!Array.isArray(nodes)) return []

  return nodes
    .filter(node => node.type === "taskItem")
    .map(node => ({
      checked: node.attrs?.checked === true,
      content: normalizeBlocks(node.content),
    }))
}

const normalizeImageBlock = (node: EditorJsonNode): Extract<NoticeContentBlock, { type: "imageBlock" }> | null => {
  const src = toStringValue(node.attrs?.src)
  if (!src) return null

  const align = node.attrs?.align === "left" || node.attrs?.align === "right" ? node.attrs.align : "center"

  return {
    type: "imageBlock",
    src,
    alt: toStringValue(node.attrs?.alt),
    caption: toStringValue(node.attrs?.caption),
    align,
    width: toNumberValue(node.attrs?.width),
  }
}

const isImageBlock = (
  value: Extract<NoticeContentBlock, { type: "imageBlock" }> | null
): value is Extract<NoticeContentBlock, { type: "imageBlock" }> => {
  return value !== null
}

const normalizeTableRows = (nodes: EditorJsonNode[] | undefined): Extract<NoticeContentBlock, { type: "table" }>["rows"] => {
  if (!Array.isArray(nodes)) return []

  return nodes
    .filter(row => row.type === "tableRow")
    .map(row => ({
      cells: Array.isArray(row.content)
        ? row.content
          .filter(cell => cell.type === "tableCell" || cell.type === "tableHeader")
          .map(cell => ({
            header: cell.type === "tableHeader",
            content: normalizeBlocks(cell.content),
            colspan: toNumberValue(cell.attrs?.colspan) ?? 1,
            rowspan: toNumberValue(cell.attrs?.rowspan) ?? 1,
          }))
        : [],
    }))
}

const normalizeBlock = (node: EditorJsonNode): NoticeContentBlock[] => {
  switch (node.type) {
    case "doc":
      return normalizeBlocks(node.content)
    case "paragraph":
      return [{type: "paragraph", content: normalizeInline(node.content)}]
    case "heading": {
      const level = node.attrs?.level === 1 || node.attrs?.level === 2 || node.attrs?.level === 3 ? node.attrs.level : 1
      return [{type: "heading", level, content: normalizeInline(node.content)}]
    }
    case "blockquote":
      return [{type: "blockquote", content: normalizeBlocks(node.content)}]
    case "codeBlock":
      return [{type: "codeBlock", text: collectText(node), language: toStringValue(node.attrs?.language) || null}]
    case "bulletList":
      return [{type: "bulletList", items: normalizeListItems(node.content)}]
    case "orderedList":
      return [{type: "orderedList", items: normalizeListItems(node.content), start: toNumberValue(node.attrs?.start) ?? 1}]
    case "taskList":
      return [{type: "taskList", items: normalizeTaskItems(node.content)}]
    case "horizontalRule":
      return [{type: "horizontalRule"}]
    case "imageBlock": {
      const image = normalizeImageBlock(node)
      return image ? [image] : []
    }
    case "imageRow": {
      const images = Array.isArray(node.content)
        ? node.content.flatMap(child => child.type === "imageBlock" ? [normalizeImageBlock(child)].filter(isImageBlock) : [])
        : []
      return images.length > 0 ? [{type: "imageRow", images}] : []
    }
    case "table":
      return [{type: "table", rows: normalizeTableRows(node.content)}]
    default: {
      const text = collectText(node).trim()
      return text ? [{type: "unknown", text}] : []
    }
  }
}

export const normalizeBlocks = (nodes: EditorJsonNode[] | undefined): NoticeContentBlock[] => {
  if (!Array.isArray(nodes)) return []
  return nodes.flatMap(normalizeBlock)
}

export const normalizeNoticeEditorContent = (value: string | null | undefined): NoticeContentBlock[] => {
  return normalizeBlock(parseEditorContent(value))
}
