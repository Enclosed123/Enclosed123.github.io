import styles from './index.less';
import { useState } from 'react';

export default function IndexPage() {
  const [state, setstate] = useState(0);
  console.log(state, '111');
  return (
    <div>
      <h1>{state}</h1>
      <h1
        className={styles.title}
        onClick={() => {
          setstate(state + 1);
        }}
      >
        Page index
      </h1>
    </div>
  );
}
