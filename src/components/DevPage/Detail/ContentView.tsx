import {ContentSpan} from "../CommonComponent";
import React from "react";

interface ContentViewProps {
    category: string,
    title: string,
    content: string
}

function ContentView({category, title, content}: ContentViewProps) {
    return (
        <ContentSpan titleColor={"#FF4081"}>
            <span className={"category"}>{category}</span>
            <span className={"title"}>{title}</span>
            <span className={"content"}>{content}</span>
        </ContentSpan>
    );
}

export default ContentView;
