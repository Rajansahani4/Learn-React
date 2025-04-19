import React, { Component } from "react";

export class Spinner extends Component {
  render() {
    return (
      <div style={styles.overlay}>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)', // dim background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999, // ensure it overlaps everything
  }
};

export default Spinner;


