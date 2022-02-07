import { useRef, useEffect } from 'react';

export default function useEventListener(eventName: string, handler: Function, element: Element | Window = window) {
    const savedHandler = useRef<Function>();

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler])

    useEffect(() => {
        const supported = element && element.addEventListener;
        if (!supported) return;

        const eventListener = (event: Event) => {
            if (savedHandler.current) {
                savedHandler.current(event);
            }
        }

        element.addEventListener(eventName, eventListener);
    }, [eventName, handler, element]);
}
