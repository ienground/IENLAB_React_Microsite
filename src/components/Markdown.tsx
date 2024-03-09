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

    * {
        line-height: 1.4;
    }
    
    h1 {
        font-size: xxx-large;
        font-weight: 700;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid ${props => props.theme.colors.colorBorder};
        transition: border-bottom-color 0.5s ease;
    }
    
    h2 {
        font-size: xx-large;
        font-weight: 600;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid ${props => props.theme.colors.colorBorder};
        transition: border-bottom-color 0.5s ease;
    }
    
    h3 {
        font-size: x-large;
        font-weight: 500;
        margin-bottom: 1rem;
    }
    
    code {
        padding: 0.2rem;
        margin: 0 0.2rem;
        border-radius: 0.2rem;
        line-height: 2;
        font-size: smaller;
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
        background-color: ${props => props.theme.colors.colorSurfaceVariant};
        transition: background-color 0.5s ease;
    }
    
    em {
        font-style: italic;
    }
    
    strong {
        font-weight: bolder;
    }
    
    blockquote {
        border-left: 4px solid ${props => props.theme.colors.colorBorder};
        padding-left: 1rem;
        margin: 1rem 0;
        transition: border-left-color 0.5s ease;
    }
    
    ol {
        margin: 0 0 1rem 2rem;
        list-style-type: decimal;
    }
    
    ul {
        margin: 0 0 1rem 2rem;
        list-style-type: disc;
    }
    
    hr {
        width: 100%;
        height: 4px;
        border: none;
        background-color: ${props => props.theme.colors.colorBorder};
        transition: background-color 0.5s ease;
    }
    
    a {
        color: #0969da;
    }
`
