const isHeadingElement = (element: Element): element is HTMLHeadingElement => {
    return /^H[1-6]$/i.test(element.tagName);
};

export const selectHeaders = (html: HTMLElement): HTMLHeadingElement[] => {
    return Array.from(html.querySelectorAll("h1, h2, h3, h4, h5, h6")).filter(
        isHeadingElement
    );
};
