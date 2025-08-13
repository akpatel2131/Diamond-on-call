import React from 'react';
import styles from './messageAlert.module.css';
import clsx from 'clsx';

const MessageAlert = ({ type, message }) => {
  if (!message) return null;
  return (
    <div className={clsx(styles.alert, styles[type])}>
      {message}
    </div>
  );
};

export default MessageAlert;
