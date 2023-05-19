import React, { useEffect, useState } from 'react';
import styles from './Twits.module.css';
import { Comments, IComment, TopThreeComments } from './Comments';
import Twit from './Twit/Twit';
import useResizeObserver from '../../../../hooks/useResizeObserver';

const Twits = () => {
  const [slicedArray, setSlicedArray] = useState<Array<IComment[]>>([]);
  const onResize = useResizeObserver();

  useEffect(() => {
    let localSize = 3;
    if (onResize.width && onResize.width > 767) {
      localSize = 3;
    }
    if (onResize.width && onResize.width < 768 && onResize.width > 599) {
      localSize = 2;
    }
    if (onResize.width && onResize.width < 600) {
      localSize = 1;
    }
    if (localSize === 1) {
      setSlicedArray([TopThreeComments]);
    } else {
      const result: IComment[][] = [];
      for (let i = 0; i < localSize; i += 1) {
        result.push([]);
      }
      let i = 0;
      Comments.forEach((t) => {
        result[i].push(t);
        if (i < localSize - 1) {
          i += 1;
        } else {
          i = 0;
        }
      });
      setSlicedArray(result);
    }
  }, [onResize]);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>Developers love Drizzle ORM!</div>
      <div className={styles.grid}>
        {slicedArray && slicedArray.map((slice, index) => (
          <div className={styles.column} key={index}>
            {slice.map((twit, i) => (
              <Twit
                key={`${index}${i}`}
                twit={twit}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Twits;
