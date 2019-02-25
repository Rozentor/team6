import React from "react";
import styles from "./styles.css";
import Field from "../Field";
import { isNull } from "util";

const createScoreTable = (scores) => {
    const table = document.getElementById("scoreTable");
    const overlay = document.getElementById("overlay");
    overlay.style.display = "block";
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    const caption = document.createElement("caption");
    caption.className = styles.caption;
    caption.innerText = 'TOP 10';
    table.appendChild(caption);
    for (let i = 0; i < scores.length; i++) {
        const nameScore = scores[i].split(':');
        const tr = document.createElement("tr");

        const name = document.createElement("td");
        name.innerText = `${i + 1}. ${nameScore[0]}`;

        const score = document.createElement("td");
        score.innerText = nameScore[1];

        tr.appendChild(name);
        tr.appendChild(score);

        table.appendChild(tr);
    }
}

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            id: 0,
            score: 0,
            isAuthorized: false,
            isMapChoosed: false,
            choosedMapId: null,
            map: null,
            maps: null
        };
    }

    getGameContent = () => (
        <div>
            <div className={styles.score}>
                Ваш счет: {this.state.score}
            </div>

            <div>
                <input type="button" value="Get results" onClick={() => this.getResults()} />
                <input type="button" value="Restart" onClick={() => { this.setState({ isMapChoosed: false }); this.loadMap(this.state.choosedMapId); }} />
                <input type="button" value="Back to maps" onClick={() => this.setState({ isMapChoosed: false })} />
            </div>

            <Field map={this.state.map} scoreUpdate={(newScore) => this.scoreUpdate(newScore)} />
        </div>);


    getLoginContent = () => (
        <div className={styles.score}>
            <div>
                Authorize:
                    <input type="text" id='authorizeName' placeholder="Name..." />
                <input type="text" id='authorizePass' placeholder="Password..." />
                <input type="button" value="Confirm" onClick={() => this.authorize()} />
            </div>
            OR
            <div>
                Register:
                    <input type="text" id='registerName' placeholder="Name..." />
                <input type="text" id='registerPass' placeholder="Password..." />
                <input type="button" value="Confirm" onClick={() => this.register()} />
            </div>
        </div>
    );

    getMapsContents() {
        if (this.state.maps != null) {
            const mapsButtons = this.state.maps.map((m, i) => <input type='button' key={i} onClick={() => this.loadMap(i)} value={m} />);
            return (
                <div>
                    {mapsButtons}
                </div>
            )
        }
        this.fetchPost('maps', { Id: this.state.id })
            .then(maps => this.setState({ maps: maps }));
    }

    loadMap = (id) =>
        fetch(`/api/game/${id}`)
            .then(response => response.json())
            .then(map => this.setState({ map: map, isMapChoosed: true, choosedMapId: id }));

    fetchPost(uri, data) {
        return fetch(`/api/game/${uri}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.ok) {
                    return res;
                } else {
                    throw res;
                }
            })
            .catch(err => err.text().then(errorMessage => alert(errorMessage)))
            .then(response => response.json());
    }

    scoreUpdate(newScore) {
        this.setState({ score: newScore });
    }

    getResults() {
        this.fetchPost('GetScore', { "Id": this.state.id, "Score": this.state.score })
            .then(scores => createScoreTable(scores));
    };

    authorize() {
        const name = document.getElementById('authorizeName').value;
        const password = document.getElementById('authorizePass').value;
        if (name.length === 0 || password.length < 4) {
            alert("Name should be longer than 1 letter and password more than 4");
        } else {
            this.login('authorize', name, password);
        }
    }

    register() {
        const name = document.getElementById('registerName').value;
        const password = document.getElementById('registerPass').value;
        if (name.length === 0 || password.length < 4) {
            alert("Name should be longer than 1 letter and password more than 4");
        } else {
            this.login('register', name, password);
        }
    }

    login(requestType, name, password) {
        this.fetchPost(requestType, { name: name, password: password })
            .then(id => this.setState({ id: id, isAuthorized: true }));
    }

    showContent() {
        if (!this.state.isAuthorized) {
            return this.getLoginContent();
        }
        if (!this.state.isMapChoosed) {
            return this.getMapsContents();
        }
        return this.getGameContent();
    }

    render() {
        return (
            <div className={styles.root}>
                <div id="overlay" className={styles.overlay} onClick={() => document.getElementById("overlay").style.display = "none"}>
                    <table className={styles.table} id="scoreTable" />
                </div>
                {this.showContent()}
            </div>
        );
    }
}