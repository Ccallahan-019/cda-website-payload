import { useState, useEffect } from 'react';

export function useMediaQuery(query: string) {
    const [matches, setMatches] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            return window.matchMedia(query).matches;
        }
        return false;
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        const mediaQueryList = window.matchMedia(query);

        const handleChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        mediaQueryList.addEventListener('change', handleChange);
        return () => mediaQueryList.removeEventListener('change', handleChange);
    }, [query]);

    return matches;
}