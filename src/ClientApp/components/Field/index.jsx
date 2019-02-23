import React from "react";
import styles from "./styles.css"


export default class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: props.map
        };
    }

    //const getElementByType = function (type, i) {
    //    switch (type) {
    //    case 0:
    //        return (<div className={styles.block} key={i} />);
    //    case 1:
    //        return (<img className={styles.block} key={i} src={iceWall} alt='IceWall' />);
    //    case 2:
    //        return (<img className={styles.block} key={i} src={star} alt="Star" />);
    //    case 3:
    //        return (<img className={styles.block} key={i} src={finish} alt="Finish" />);
    //    }
    //};

    render () {
        return (
            <div className={styles.root}>
            </div>
        );
    }
}