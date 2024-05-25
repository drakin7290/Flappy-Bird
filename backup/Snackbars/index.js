import { useEffect } from 'react';
import { useState, forwardRef, useImperativeHandle } from 'react';
import styles from './styles.module.scss';

const SnackbarsChild = ({ string, duration }) => {
  const [style, setStyle] = useState({});
  const [isShow, setIsShow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setStyle({ opacity: '0', transform: 'translateX(calc(-100% - 32px))' });
    }, duration);
    setTimeout(() => {
      setStyle({ height: '0px' });
      setIsShow(false);
    }, duration + 1000);
  });
  return (
    <>
      {isShow ? (
        <div className={styles['snackbars-child']} style={{ ...style }}>
          <p className={styles['snackbars-child__message']}>{string}</p>
        </div>
      ) : null}
    </>
  );
};

const Snackbars = forwardRef((props, ref) => {
  const [dataSnackbars, setDataSnackbars] = useState([]);
  useImperativeHandle(ref, () => ({
    show(string, duration = 3000) {
      setDataSnackbars((prevData) => [...prevData, { string, duration }]);
    },
  }));
  return (
    <div className={styles['snackbars']}>
      {dataSnackbars.map((item, index) => {
        return <SnackbarsChild string={item.string} duration={item.duration} />;
      })}
    </div>
  );
});

export default Snackbars;
