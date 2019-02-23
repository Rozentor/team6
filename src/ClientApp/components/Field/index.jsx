import React from 'react';
import styles from './styles.css'


export default class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: props.map
        }
    }
    render () {
        return (
            <div className={styles.root} />
                
        );
    }
}
