import React from "react";
import styles from "./styles.css";
import Field from "../Field";


function GetPlayerPosition(map) {
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

export default class App extends React.Component {
    constructor () {
        super();
        this.state = {
            score: 0,
            map: [],
            position: { x: 0, y: 0 }
        };
    }

    componentDidMount() {
        fetch("/api/game/id=0")
            .then(response => response.json())
            .then(maps => {
                const playerPos = GetPlayerPosition(maps);
                this.setState({ map: maps, position: playerPos });
            });
        // console.log(this.state.map);
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
        };
    }

    render () {
        return (
            <div className={ styles.root }>
                <div className={styles.score}>
                    Ваш счет: { this.state.score }
                </div>
                <Field map={this.state.map}/>
            </div>
        );
    }
}

const getMove = function(clickEvent) {
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