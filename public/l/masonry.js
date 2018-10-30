/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
registerLayout('masonry', class {
  static get inputProperties() {
    return ['--padding', '--columns'];
  }

  *intrinsicSizes() { /* TODO implement :) */ }
  *layout(children, edges, constraints, styleMap) {
    console.log({ children, edges, constraints, styleMap })
    const inlineSize = constraints.fixedInlineSize;

    const padding = parseInt(styleMap.get('--padding').toString());
    const columnValue = styleMap.get('--columns').toString();

    // We also accept 'auto', which will select the BEST number of columns.
    let columns = parseInt(columnValue);

    if (columnValue == 'auto' || !columns) {
      // 没有columns时生成默认值
      columns = Math.ceil(inlineSize / 350); // MAGIC NUMBER \o/.
    }

    console.log(columns)

    // Layout all children with simply their column size.
    const childInlineSize = (inlineSize - ((columns + 1) * padding)) / columns;
    console.log(childInlineSize)

    const availableBlockSize = constraints.fixedBlockSize ? constraints.fixedBlockSize : null;

    const childFragments = yield children.map((child) => {
      return child.layoutNextFragment({
        fixedInlineSize: childInlineSize,
        // 限制子元素不能超过
        availableBlockSize: null
      });
    });

    console.log(childFragments[0])
    console.log(childFragments[1])
    console.log(childFragments[2])

    let autoBlockSize = 0;
    const columnOffsets = Array(columns).fill(0);
    console.log('init columnOffsets', columnOffsets)
    for (let childFragment of childFragments) {
      // Select the column with the least amount of stuff in it.
      const min = columnOffsets.reduce((acc, val, idx) => {
        if (!acc || val < acc.val) {
          return { idx, val };
        }
        return acc;
      }, { val: +Infinity, idx: -1 });

      // 最矮的那一排的 idx 及 val
      console.log('min', min)

      /**
       * |    Logical   |	Physical |
       * |      ---     |    ---   |
       * |  inlineSize  |   width  |
       * |  inlineStart |   left   |
       * |  inlineEnd  	|   right  |
       * |   blockSize  |   height |
       * |  blockStart  |    top   |
       * |   blockEnd   |   bottom |
       * 
       * - inline offset ->
       *                  |
       *                block
       *                offset
       *                  |               
       *                  v
       *                    - inline size -
       *                   |               |
       *                  block            |
       *                  size             |
       *                   |               |
       *                     - - - - - - - 
       */
      childFragment.inlineOffset = padding + (childInlineSize + padding) * min.idx;
      childFragment.blockOffset = padding + min.val;

      columnOffsets[min.idx] = childFragment.blockOffset + childFragment.blockSize;
      autoBlockSize = Math.max(autoBlockSize, columnOffsets[min.idx] + padding);
      console.log(autoBlockSize, columnOffsets)
    }

    console.log('result', columnOffsets, childFragments)

    return { autoBlockSize, childFragments };
  }
});
