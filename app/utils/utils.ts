import { useEffect, useRef } from "react";

export const capitaliseInitial = (word: string, splitSpacing: string = " ", joinSpacing: string = " ") : string => {
    return word.split(splitSpacing).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(joinSpacing);
}

export const useDebounce = (callback, delay: number) => {
    const callbackRef = useRef(callback);
    const timeoutRef = useRef(null);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    const debouncedCallback = (...args) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            callbackRef.current(...args);
        }, delay);
    };

    return debouncedCallback;
}