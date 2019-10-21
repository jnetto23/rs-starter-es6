import './style.css';

export default class Alert {
    constructor(tipo, menssage, t = 30) {
        const App = document.querySelector('#app');
        if(App.querySelector('[data-type=alert-timer].alert')) App.querySelector('[data-type=alert-timer].alert').remove();
    
        let alert = document.createElement('div');
        alert.classList.add(`alert`);
        alert.classList.add(`alert-${tipo}`);
        alert.setAttribute('data-type', 'alert-timer');

        let timer = document.createElement('span');
        timer.classList.add('alert-timer');
        
        let alertBody = document.createElement('div');
        alertBody.classList.add('alert-body');
        alert.appendChild(alertBody);
        alert.appendChild(timer);

        let error = document.createElement('span');
        let errorTxt = document.createTextNode(menssage);
        error.appendChild(errorTxt);
        error.classList.add('alert-msg');
        alertBody.appendChild(error);
        
        let close = document.createElement('div');
        let btnClose = document.createElement('button');
        btnClose.appendChild(document.createTextNode('x'));
        btnClose.classList.add('close');
        btnClose.addEventListener('click', this.btnRomoveEl(btnClose, 'alert'));
        close.appendChild(btnClose);
        alertBody.appendChild(close);
        
        App.insertBefore(alert, App.firstChild);
        
        let width = 100;
        let id = setInterval(frame, t);
        function frame() {
            if (width <= 0) {
                clearInterval(id);
                alert.remove();
            } else {
                width--; 
                timer.style.width = width + '%'; 
            };
        };
    };
    
    btnRomoveEl(el, clEl) {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            let elRemove = this.locationParentNodeByClassName(el, clEl);
            elRemove.remove();
        });
    };

    locationParentNodeByClassName(el, tagName) {
        let t = el;
        while(t.classList.contains(tagName) != true) {
            t = t.parentNode;
        }
        return t;
    };
}