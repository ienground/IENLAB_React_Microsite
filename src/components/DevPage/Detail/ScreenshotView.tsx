import {ContentScreenshot, PreviewPhoneWrapper} from "../CommonComponent";
import React from "react";

interface ScreenshotViewProps {
    screenshots: string[],
    isReverse: boolean
}

export default function ScreenshotView({screenshots, isReverse}: ScreenshotViewProps) {
    const result = [];
    for (let i = 0; i < screenshots.length; i++) {
        result.push(
            <PreviewPhoneWrapper>
                <div style={{backgroundImage: `url(${screenshots[i]})`}} />
            </PreviewPhoneWrapper>
        );
    }

    return (
        <ContentScreenshot className={isReverse ? "reverse" : ""}>
            {result}
        </ContentScreenshot>
    );
}
