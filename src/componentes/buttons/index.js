import './style.css';

export default class Btns {
    default(txt, listener) {
        let btn = document.createElement('button');
        btn.appendChild(document.createTextNode(txt));
        this.addListener(btn, listener);
            
        return btn;
    };
    
    pressEnter(listener) {
        let btn = document.createElement('button');
        btn.classList.add('start-btn');
        this.addListener(btn, listener);
    
        let span = document.createElement('span');
        span.classList.add('start-text');
        span.appendChild(document.createTextNode('Entrar'));
        btn.appendChild(span);
        
        return btn;
    };
    
    flutuanteAdd(listener) {
        let btn = document.createElement('button');
        btn.classList.add('btn-flutuante-add');
        btn.setAttribute('data-target', '#add-new-user');
        btn.setAttribute('data-toggle', 'modal');
        btn.appendChild(document.createTextNode('+'));
        this.addListener(btn, listener);
        
        return btn;
    };

    flutuanteFight(listener) {
        
        let btn = document.createElement('button');
        btn.classList.add('btn-flutuante-fight');
        this.addListener(btn, listener);
        return btn;
    };

    addListener(btn, listener) {
        if(listener) {
            if(Object.keys(listener).length > 0) {
                for(event of Object.keys(listener)) {
                    btn.addEventListener(event, listener[event]);
                };
            };
        };
    };

}