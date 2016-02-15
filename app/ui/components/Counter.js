import React, { Component, PropTypes } from 'react';
import styles from './Counter.module.styl';

class Counter extends Component {
  static propTypes = {
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    counter: PropTypes.number.isRequired
  };

  render() {
    const { increment, decrement, counter } = this.props;
    return (
      <div>
        <div className={`counter ${styles.counter}`}>
          {counter}
        </div>
        <div className={styles.btnGroup}>
          <button className={styles.btn} onClick={increment}>
            +
          </button>
          <button className={styles.btn} onClick={decrement}>
            -
          </button>
        </div>
      </div>
    );
  }
}

export default Counter;
