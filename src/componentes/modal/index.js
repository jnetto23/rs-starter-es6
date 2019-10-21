import './style.css';

export default class Modal {
    constructor() {}
    static shModal(e) {
        let m;
        let b = document.querySelector('#app');
        if(e) {
            m = document.querySelector(e.getAttribute('data-target'));
            if(m.querySelector('form')) {
                (m.querySelector('form')).reset();
                if(m.querySelector('form input[autofocus]')) {
                    window.setTimeout(function () {
                        (m.querySelector('form input[autofocus]')).focus();
                    }, 0);
                };
            };
        } else {
            m = document.querySelector('div.modal.open');
        };     
        b.classList.toggle('modal');
        m.classList.toggle('open');
    };

    static create(id, title, body) {

        let modal = document.createElement('div');
        modal.setAttribute('id', id);
        modal.classList.add('modal');
        modal.addEventListener('click', (e) => {
            if((e.target).classList.contains('modal')) this.shModal();
        });
        modal.addEventListener('keyup', (e) => {
            if(e.key === 'Escape') this.shModal();
        })

        let modaldiv = document.createElement('div');
        modaldiv.classList.add('modal-content');
        modal.appendChild(modaldiv);

        let modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-header');

        let modalTitle = document.createElement('span');
        modalTitle.appendChild(document.createTextNode(title));
        modalHeader.appendChild(modalTitle);
        
        let modalClose = document.createElement('button');
        modalClose.classList.add('close');
        modalClose.setAttribute('data-dismiss', 'modal');
        modalClose.appendChild(document.createTextNode('x'));
        modalClose.addEventListener('click', () => this.shModal());
        modalHeader.appendChild(modalClose);
        modaldiv.appendChild(modalHeader);

        let modalBody = document.createElement('div');
        modalBody.classList.add('modal-body');
        modalBody.appendChild(body);
        modaldiv.appendChild(modalBody);

        (document.querySelector('#app')).appendChild(modal);
        return;
    };
}