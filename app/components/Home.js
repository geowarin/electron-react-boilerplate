import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.module.styl';

export default class Home extends Component {
  render() {
    return (
      <div className={styles.container}>
	<h2>Home</h2>
      </div>
    );
  }
}
