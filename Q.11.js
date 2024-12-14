 
function createCounter(initialValue) {
    let count = initialValue;  

    return {
        increment: function () {
            count += 1;
            return count;
        },
        decrement: function () {
            count -= 1;
            return count;
        },
        getCount: function () {
            return count;
        }
    };
}

 
function setupCounterUI(initialValue) {
     
    const counter = createCounter(initialValue);

     
    const app = document.createElement('div');
    app.style.textAlign = 'center';

    const counterDisplay = document.createElement('h1');
    counterDisplay.textContent = counter.getCount();

    const incrementButton = document.createElement('button');
    incrementButton.textContent = 'Increment';

    const decrementButton = document.createElement('button');
    decrementButton.textContent = 'Decrement';

    
    incrementButton.style.margin = '5px';
    decrementButton.style.margin = '5px';

     
    incrementButton.addEventListener('click', () => {
        counterDisplay.textContent = counter.increment();
    });

    decrementButton.addEventListener('click', () => {
        counterDisplay.textContent = counter.decrement();
    });

    
    app.appendChild(counterDisplay);
    app.appendChild(incrementButton);
    app.appendChild(decrementButton);

 
    document.body.appendChild(app);
}

 
setupCounterUI(0);
