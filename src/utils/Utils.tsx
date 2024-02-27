import {useEffect, useState} from "react";

export function convertRemToPixels(rem: number) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export function sleep(second: number) {
    return new Promise(resolve => setTimeout(resolve, second * 1000));
}
