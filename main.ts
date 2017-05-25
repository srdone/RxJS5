import { Observable } from 'rxjs';

let circle = document.getElementById("circle");
let output = document.getElementById('output');
let button = document.getElementById('button');

let mouseMoves = Observable.fromEvent(document, 'mousemove')
    .map((e : MouseEvent) => ({x: e.clientX, y: e.clientY}))
    .filter(value => value.x < 500)
    .delay(300);

let click = Observable.fromEvent(button, "click");

function onNext (value) {
    circle.style.left = value.x;
    circle.style.top = value.y;
}

function load(url: string) {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
        let movies = JSON.parse(xhr.responseText);
        movies.forEach(m => {
            let div = document.createElement("div");
            div.innerText = m.title;
            output.appendChild(div);
        });
    })

    xhr.open("GET", url);
    xhr.send();
}

mouseMoves.subscribe(
        onNext,
        e => console.log(`error: ${e}`),
        () => console.log('complete')
    )

click.subscribe(
    e => load("movies.json")
)