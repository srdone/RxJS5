import { Observable } from "rxjs";

let numbers = [1, 5, 10];
let source = Observable.create(observer => {

    let index = 0;
    let produceValue = () => {
        observer.next(numbers[index++]);

        if (index < numbers.length) {
            setTimeout(produceValue, 2000);
        }
        else {
            observer.complete();
        }
    }

    produceValue();

});

source.subscribe(
    v => console.log(`value: ${v}`),
    e => console.log(`error: ${e}`),
    () => console.log('complete')
)
