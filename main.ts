import { Observable, Observer } from "rxjs";

let numbers = [1, 5, 10];
let source = Observable.create(observer => {

    for (let n of numbers) {
        observer.next(n);
    }

    observer.complete();

});

source.subscribe(
    v => console.log(`value: ${v}`),
    e => console.log(`error: ${e}`),
    () => console.log('complete')
)
