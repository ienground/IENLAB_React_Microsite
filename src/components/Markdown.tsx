import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styled from "styled-components";

interface MarkdownProps {
    text: string
}

export default function Markdown({text}: MarkdownProps) {
    return (
        <MarkdownStyle>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
        </MarkdownStyle>
    )
}

const MarkdownStyle = styled.div`
    transition: color 0.5s ease;
    
    h1 {
        font-size: xx-large;
        font-weight: 700;
        margin-bottom: 1rem;
    }
    
    h2 {
        font-size: x-large;
        font-weight: 600;
        margin-bottom: 1rem;
    }
    
    h3 {
        font-size: large;
        font-weight: 500;
        margin-bottom: 1rem;
    }
    
    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    }
    
    em {
        font-style: italic;
    }
    
    strong {
        font-weight: bolder;
    }
    
    blockquote {
        border-left: 2px solid ${props => props.theme.colors.colorPrimary};
        padding-left: 1rem;
    }
    
    ul {
        text-decoration-style: solid;
    }
    
    hr {
        width: 100%;
        height: 2px;
        background-color: ${props => props.theme.colors.colorOnSurfaceVariant};
    }
`
