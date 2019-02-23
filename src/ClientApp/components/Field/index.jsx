import React from "react";
import styles from "./styles.css"

function getPlayerPosition(map) {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === entity.player) {
                map[i][j] = entity.emptyPlace;
                return { x: j, y: i };
            }
        }
    }
}

function isInsideMap(x, y) {
    return (x <= 8 && x >= 0) && (y <= 8 || y >= 0);
}

const entity = Object.freeze({ "emptyPlace": 0, "box": 1, "wall": 2, "store": 3, "player": 4, "boxOnStore": 5 });

export default class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: [],
            position: { x: 0, y: 0 },
            score: 0,
            scoreUpdateFunc: props.scoreUpdate
        };
    }

    componentDidMount() {
        fetch("/api/game/id=0")
            .then(response => response.json())
            .then(maps => {
                const playerPos = getPlayerPosition(maps);
                this.setState({ map: maps, position: playerPos });
            });
        // console.log(this.state.map);
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

    Move() {
        const delta = getMove();
        const futurePlace = { x: position.x + delta.dx, y: position.y + delta.dy };
        if (isInsideMap(futurePlace.x, futurePlace.y)) {
            if (this.map[futurePlace.y, futurePlace.x] === entity.emptyPlace ||
                this.map[futurePlace.y, futurePlace.x] === entity.store)
                this.setState({ position: futurePlace });
        };
        if (this.map[futurePlace.y, futurePlace.x] === entity.box) {
            const futureBoxPlace = { x: futurePlace.x + delta.dx, y: futurePlace.y + delta.dy };
            if (this.map[futureBoxPlace.y, futureBoxPlace.x] === entity.emptyPlace) {
                const newMap = this.map.copy();
                newMap[futureBoxPlace.y, futureBoxPlace.x] = entity.box;
                this.setState({ position: futurePlace, map: newMap });
            }
        };
        if (this.map[futurePlace.y, futurePlace.x] === entity.boxOnStore) {
            const futureBoxPlace = { x: futurePlace.x + delta.dx, y: futurePlace.y + delta.dy };
            if (this.map[futureBoxPlace.y, futureBoxPlace.x] === entity.emptyPlace) {
                const newMap = this.map.copy();
                newMap[futureBoxPlace.y, futureBoxPlace.x] = entity.box;
                newMap[futurePlace.y, futurePlace.x] = entity.store;
                this.setState({ position: futurePlace, map: newMap });
            }
        };
        if (this.map[futureBoxPlace.y, futureBoxPlace.x] === entity.store) {
            const newMap = this.map.copy();
            newMap[futureBoxPlace.y, futureBoxPlace.x] = entity.boxOnStore;
            this.setState({ position: futurePlace, map: newMap, score: score + 10 });
            this.state.scoreUpdateFunc(this.state.score);
        };
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

const getMove = function (clickEvent) {
    if (clickEvent.keyCode === 38 /* up */ || clickEvent.keyCode === 87 /* w */) {
        return { dx: 0, dy: -1 };
    }
    if (clickEvent.keyCode === 39 /* right */ || clickEvent.keyCode === 68 /* d */) {
        return { dx: 1, dy: 0 };
    }
    if (clickEvent.keyCode === 40 /* down */ || clickEvent.keyCode === 83 /* s */) {
        return { dx: 0, dy: 1 };
    }
    if (clickEvent.keyCode === 37 /* left */ || clickEvent.keyCode === 65 /* a */) {
        return { dx: -1, dy: 0 };
    }
    return { dx: 0, dy: 0 };
};