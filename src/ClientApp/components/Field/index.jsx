import React from "react";
import styles from "./styles.css"


export default class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: props.map
        };
    }


    getElementByType = function(type, i) {
        switch (type) {
        case 0:
            return (<td key={i}/>);
        case 1:
                return (<td className={styles.box} key={i}/>);
        case 2:
                return (<td className={styles.wall} key={i}/>);
        case 3:
                return (<td className={styles.target} key={i}/>);
        case 4:
            return (<div className="movablePart player" key={i}/>);
        case 5:
            return (<div className="movablePart boxOnTarget" key={i}/>);
        }
    }

    render() {
        return (
            <div className={styles.root}>
                <div className={styles.fieldWrapper}>
                    <table className={styles.field}>
                        <tbody>
                            {this.state.map.map((raw, i) => <tr key={i}>{(raw.map(this.getElementByType))}</tr>)}
                        </tbody>
                    </table>
                </div>
            </div>);
    }
};