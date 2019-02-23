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

function isInsideMap(x, y) {
    return (x <= 8 && x >= 0) && (y <= 8 || y >= 0);
}

const entity = Object.freeze({ "emptyPlace": 0, "box": 1, "wall": 2, "store": 3, "player": 4, "boxOnStore": 5 });

export default class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: [],
            playerPosition: { x: 0, y: 0 },
            score: 0,
            scoreUpdateFunc: props.scoreUpdate
        };
        document.addEventListener('keydown', (e) => this.onKeyPressed(e));
    }

    componentDidMount() {
        fetch("/api/game/id=0")
            .then(response => response.json())
            .then(maps => {
                const playerPos = getPlayerPosition(maps);
                console.log(playerPos);
                this.setState({ map: maps, playerPosition: playerPos });
            });
        // console.log(this.state.map);
    }

    getElementByType = function (type, x, y) {
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
        console.log(clickEvent);
        const delta = getMove(clickEvent);
        const { playerPosition, score, map } = this.state;

        const futurePlace = { x: playerPosition.x + delta.dx, y: playerPosition.y + delta.dy };
        if (isInsideMap(futurePlace.x, futurePlace.y)) {
            if (map[futurePlace.y][futurePlace.x] === entity.emptyPlace ||
                map[futurePlace.y][futurePlace.x] === entity.store)
                this.setState({ playerPosition: futurePlace });
        };
        if (map[futurePlace.y][futurePlace.x] === entity.box) {
            const futureBoxPlace = { x: futurePlace.x + delta.dx, y: futurePlace.y + delta.dy };
            if (map[futureBoxPlace.y][futureBoxPlace.x] === entity.emptyPlace) {
                const newMap = map.copy();
                newMap[futureBoxPlace.y][futureBoxPlace.x] = entity.box;
                this.setState({ playerPosition: futurePlace, map: newMap });
            }
        };
        if (map[futurePlace.y][futurePlace.x] === entity.boxOnStore) {
            const futureBoxPlace = { x: futurePlace.x + delta.dx, y: futurePlace.y + delta.dy };
            if (map[futureBoxPlace.y][futureBoxPlace.x] === entity.emptyPlace) {
                const newMap = map.copy();
                newMap[futureBoxPlace.y][futureBoxPlace.x] = entity.box;
                newMap[futurePlace.y][futurePlace.x] = entity.store;
                this.setState({ playerPosition: futurePlace, map: newMap });
            }
        };
        if (map[futureBoxPlace.y][futureBoxPlace.x] === entity.store) {
            const newMap = map.copy();
            newMap[futureBoxPlace.y][futureBoxPlace.x] = entity.boxOnStore;
            this.setState({ playerPosition: futurePlace, map: newMap, score: score + 10 });
            this.state.scoreUpdateFunc(score);
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