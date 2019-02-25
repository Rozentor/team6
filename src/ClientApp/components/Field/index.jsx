import React from "react";
import styles from "./styles.css"

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

const entity = Object.freeze({ "emptyPlace": 0, "box": 1, "wall": 2, "store": 3, "player": 4, "boxOnStore": 5 });

export default class Field extends React.Component {
    constructor(props) {
        super(props);
        const playerPos = getPlayerPosition(props.map);
        this.state = {
            map: props.map,
            playerPosition: playerPos,
            score: 0
        };
        document.addEventListener('keydown', (e) => this.onKeyPressed(e));
    }

    getElementByType(type, x, y) {
        if (x === this.state.playerPosition.x && y === this.state.playerPosition.y)
            return (<td className={styles.player} key={x} />);
        switch (type) {
            case 0:
                return (<td key={x} />);
            case 1:
                return (<td className={styles.box} key={x} />);
            case 2:
                return (<td className={styles.wall} key={x} />);
            case 3:
                return (<td className={styles.target} key={x} />);
            case 5:
                return (<td className={styles.boxOnTarget} key={x} />);
        }
    }

    onKeyPressed(clickEvent) {
        const delta = getMove(clickEvent);
        const { playerPosition, score, map } = this.state;

        const futurePlace = { x: playerPosition.x + delta.dx, y: playerPosition.y + delta.dy };
        const futureBoxPlace = { x: futurePlace.x + delta.dx, y: futurePlace.y + delta.dy };

        if (map[futurePlace.y][futurePlace.x] === entity.box) {
            if (map[futureBoxPlace.y][futureBoxPlace.x] === entity.emptyPlace
                || map[futureBoxPlace.y][futureBoxPlace.x] === entity.store) {
                const newMap = map.slice();
                newMap[futurePlace.y][futurePlace.x] = entity.emptyPlace;
                if (map[futureBoxPlace.y][futureBoxPlace.x] === entity.store) {
                    newMap[futureBoxPlace.y][futureBoxPlace.x] = entity.boxOnStore;
                    const newScore = score + 10;
                    this.props.scoreUpdate(newScore);
                    this.setState({ playerPosition: futurePlace, map: newMap, score: newScore });
                } else {
                    newMap[futureBoxPlace.y][futureBoxPlace.x] = entity.box;
                    this.setState({ playerPosition: futurePlace, map: newMap });
                }
            }
            return;
        };
        if (map[futurePlace.y][futurePlace.x] === entity.boxOnStore) {
            if (map[futureBoxPlace.y][futureBoxPlace.x] === entity.emptyPlace ||
                map[futureBoxPlace.y][futureBoxPlace.x] === entity.store) {
                const newMap = map.slice();
                let newScore = score;
                if (map[futureBoxPlace.y][futureBoxPlace.x] === entity.store) {
                    newMap[futureBoxPlace.y][futureBoxPlace.x] = entity.boxOnStore;
                    newMap[futurePlace.y][futurePlace.x] = entity.store;
                } else {
                    newMap[futureBoxPlace.y][futureBoxPlace.x] = entity.box;
                    newMap[futurePlace.y][futurePlace.x] = entity.store;
                    newScore -= 10;
                }
                this.props.scoreUpdate(newScore);
                this.setState({ playerPosition: futurePlace, map: newMap, score: newScore });
            };
            return;
        };
        if (map[futurePlace.y][futurePlace.x] !== entity.wall) {
            this.setState({ playerPosition: futurePlace });
        };
    }

    render() {
        return (
            <div className={styles.root}>
                <div className={styles.fieldWrapper}>
                    <table className={styles.field}>
                        <tbody>
                            {this.state.map.map((raw, y) =>
                                <tr key={y}>{raw.map((type, x) => this.getElementByType(type, x, y))}</tr>)}
                        </tbody>
                    </table>
                </div>
            </div>);
    }
};