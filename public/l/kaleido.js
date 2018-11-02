registerLayout("kaleido", class {

    * intrinsicSizes(children, edges, styleMap) { }

    * layout(children, edges, constraintSpace, styles) {
        const childFragments = []
        for (const child of children) {
            const childFragment = yield child.layoutNextFragment();
            childFragments.push(childFragment);
        }
        const {
            inlineSize,
            blockSize
        } = childFragments[0]

        const {
            fixedBlockSize,
            fixedInlineSize
        } = constraintSpace

        childFragments[0].blockOffset = (fixedBlockSize - blockSize) / 2
        childFragments[0].inlineOffset = (fixedInlineSize - inlineSize) / 2

        return {
            // only the first element will be mount
            childFragments: childFragments.slice(0, 1)
        };
    }
});