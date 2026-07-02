import {useEffect, useRef, useState, type ReactNode} from "react"
import {cn} from "@/lib/utils.ts"
import type {
  NoticeContentBlock,
  NoticeInlineContent,
  NoticeInlineMark
} from "@/ui/public/notice/detail/NoticeEditorContentMapper.ts"
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx"
import {Carousel} from "motion-plus/react"
import {CrossfadeImage} from "@ienlab/react-library"

type Props = {
  blocks: NoticeContentBlock[]
  className?: string
}

export function NoticeEditorContentRenderer({blocks, className}: Props) {
  if (blocks.length === 0) {
    return <div className={cn("py-8 text-sm text-muted-foreground", className)}>정보 없음</div>
  }

  return (
    <div className={cn("flex flex-col gap-y-5 text-base leading-7 md:text-lg md:leading-8", className)}>
      {renderBlocks(blocks)}
    </div>
  )
}

const renderBlocks = (blocks: NoticeContentBlock[]): ReactNode[] => {
  return blocks.map((block, index) => renderBlock(block, index))
}

const renderBlock = (block: NoticeContentBlock, index: number): ReactNode => {
  switch (block.type) {
    case "paragraph":
      return <p key={index}>{renderInline(block.content)}</p>
    case "heading": {
      const className = cn(
        "font-semibold leading-tight tracking-normal",
        block.level === 1 && "mt-8 text-3xl md:text-4xl",
        block.level === 2 && "mt-7 text-2xl md:text-3xl",
        block.level === 3 && "mt-6 text-xl md:text-2xl"
      )
      if (block.level === 1) return <h2
        key={index}
        className={className}
      >{renderInline(block.content)}</h2>
      if (block.level === 2) return <h3
        key={index}
        className={className}
      >{renderInline(block.content)}</h3>
      return <h4
        key={index}
        className={className}
      >{renderInline(block.content)}</h4>
    }
    case "blockquote":
      return (
        <blockquote
          key={index}
          className="border-l-2 border-foreground/70 pl-4 text-muted-foreground"
        >
          <div className="flex flex-col gap-y-3">{renderBlocks(block.content)}</div>
        </blockquote>
      )
    case "codeBlock":
      return (
        <pre
          key={index}
          className="overflow-x-auto rounded-md border bg-muted/40 p-4 text-sm leading-6"
        >
          <code>{block.text}</code>
        </pre>
      )
    case "bulletList":
      return (
        <ul
          key={index}
          className="list-disc space-y-2 pl-5"
        >
          {block.items.map((item, itemIndex) => <li key={itemIndex}>{renderListItem(item)}</li>)}
        </ul>
      )
    case "orderedList":
      return (
        <ol
          key={index}
          className="list-decimal space-y-2 pl-5"
          start={block.start}
        >
          {block.items.map((item, itemIndex) => <li key={itemIndex}>{renderListItem(item)}</li>)}
        </ol>
      )
    case "taskList":
      return (
        <ul
          key={index}
          className="space-y-2"
        >
          {block.items.map((item, itemIndex) => (
            <li
              key={itemIndex}
              className="flex items-start gap-3"
            >
              <input
                type="checkbox"
                checked={item.checked}
                readOnly
                className="mt-2"
              />
              <div className="min-w-0 flex-1">{renderListItem(item.content)}</div>
            </li>
          ))}
        </ul>
      )
    case "horizontalRule":
      return <hr
        key={index}
        className="my-3 border-foreground/20"
      />
    case "imageBlock":
      return renderImage(block, index)
    case "imageRow":
      return <ImageRowGallery key={index} images={block.images} />
    case "table":
      return (
        <div
          key={index}
          className="overflow-x-auto rounded-md border"
        >
          <table className="w-full table-fixed border-collapse text-sm">
            <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.cells.map((cell, cellIndex) => {
                  const Tag = cell.header ? "th" : "td"
                  return (
                    <Tag
                      key={cellIndex}
                      className={cn("border p-2 text-left align-top", cell.header && "bg-muted font-semibold text-muted-foreground")}
                      colSpan={cell.colspan}
                      rowSpan={cell.rowspan}
                    >
                      <div className="flex flex-col gap-y-2">{renderBlocks(cell.content)}</div>
                    </Tag>
                  )
                })}
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )
    case "unknown":
      return <p key={index}>{block.text}</p>
  }
}

const renderListItem = (blocks: NoticeContentBlock[]): ReactNode => {
  if (blocks.length === 1 && blocks[0].type === "paragraph") {
    return renderInline(blocks[0].content)
  }

  return <div className="flex flex-col gap-y-2">{renderBlocks(blocks)}</div>
}

function ImageRowGallery(props: {
  images: Extract<NoticeContentBlock, { type: "imageBlock" }>[]
}) {
  return (
    <Carousel
      items={props.images.map((image, imageIndex) => renderImage(image, imageIndex, true))}
      overflow
      gap={16}
      loop={false}
    />
  )
}

const renderImage = (
  block: Extract<NoticeContentBlock, { type: "imageBlock" }>,
  index: number,
  isGalleryItem: boolean = false
): ReactNode => {
  const alignClass = block.align === "left" ? "mr-auto" : block.align === "right" ? "ml-auto" : "mx-auto"

  return (
    <figure
      key={index}
      className={cn(
        "flex max-w-full flex-col gap-2",
        isGalleryItem ? cn("max-w-none shrink-0", alignClass) : "w-full"
      )}
    >
      <div
        className={cn(
          "rounded-md border overflow-hidden",
          isGalleryItem ? "h-64 w-auto max-w-none md:h-80 xl:h-96"
            : "max-h-[90vh] w-full"
        )}
      >
        {isGalleryItem ? (
          <CrossfadeImage
            draggable={false}
            src={block.src}
            alt={block.alt}
            className={cn(
              "object-cover w-full h-full transition-transform duration-300 hover:scale-102",
            )}
            loading="lazy"
          />
        ) : (
          <CrossfadeImage
            draggable={false}
            src={block.src}
            alt={block.alt}
            className="object-contain transition-transform duration-300 hover:scale-102"
            loading="lazy"
          />
        )}
      </div>
      {block.caption && <figcaption className="text-center text-sm text-muted-foreground">{block.caption}</figcaption>}
    </figure>
  )
}

const renderInline = (content: NoticeInlineContent[]): ReactNode[] => {
  if (content.length === 0) return []

  return content.map((node, index) => {
    if (node.type === "hardBreak") return <br key={index}/>
    return <FragmentWithMarks
      key={index}
      marks={node.marks}
    >{node.text}</FragmentWithMarks>
  })
}

function FragmentWithMarks(props: {
  marks: NoticeInlineMark[]
  children: ReactNode
}) {
  return props.marks.reduce<ReactNode>((children, mark) => {
    switch (mark.type) {
      case "bold":
        return <strong>{children}</strong>
      case "italic":
        return <em>{children}</em>
      case "underline":
        return <u>{children}</u>
      case "strike":
        return <s>{children}</s>
      case "code":
        return <code className="rounded-md bg-muted px-1.5 py-1 font-mono text-sm">{children}</code>
      case "superscript":
        return <sup>{children}</sup>
      case "subscript":
        return <sub>{children}</sub>
      case "link":
        return (
          <a
            href={mark.href}
            target={mark.target ?? "_blank"}
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            {children}
          </a>
        )
    }
  }, props.children)
}
