import type { Components } from 'react-markdown'

export const markdownComponents: Components = {
  h1: ({ node, ...props }) => (
    <h1 className="text-2xl font-bold tracking-tight" {...props} />
  ),
  h2: ({ node, ...props }) => (
    <h2 className="text-xl font-semibold tracking-tight" {...props} />
  ),
  p: ({ node, ...props }) => (
    <p className="leading-7 not-first:mt-6" {...props} />
  ),
  a: ({ node, ...props }) => (
    <a className="text-blue-600 underline underline-offset-4" {...props} />
  ),
}