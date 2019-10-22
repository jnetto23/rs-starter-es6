import './style.css';

import api from '../../api';

import Btn from '../../componentes/buttons';
import Modal from '../../componentes/modal';
import AlertWithTimer from '../../componentes/alert';

import imgVs from './img/vs.png';
import imgFigth from './img/soco.png';
import Route from '../../componentes/routes';

export default class Selection {
    constructor() {
        this.users = [];
    };

    render() {
        if(sessionStorage.hasUserInCombate === 'true') {
            let main = document.querySelector('main');
            if(this.users.length >= 2) {
                if(!document.querySelector('.commands button.btn-flutuante-fight')) {
                    let btnFigth = (new Btn()).flutuanteFight({
                        click: () => this.result()
                    });
                    let img = document.createElement('img');
                    img.setAttribute('src', imgFigth);
                    img.setAttribute('alt', 'img btn figth');
                    btnFigth.appendChild(img);
                    let commands = document.querySelector('.commands');
                    let btnAdd = document.querySelector('.commands button.btn-flutuante-add'); 
                    commands.insertBefore(btnFigth, btnAdd);
                }
            }

            if(this.users.length > 2) {
                if(!main.classList.contains('multi-players')) {
                    main.classList.add('multi-players')
                };
                if(main.classList.contains('two-players')) {
                    main.classList.remove('two-players') 
                };
            } else {
                if(!main.classList.contains('two-players')) {
                    main.classList.add('two-players')
                };
            }

            if((document.querySelector('img.vs.default'))) (document.querySelector('img.vs.default')).remove();
			
            let players = document.querySelector('.players');
            
            if(document.querySelectorAll('.player').length === 0) {
				players.appendChild(this.createPlayerEl());
                return;

            } else {
                let img = document.createElement('img');
                img.classList.add('vs');
                img.setAttribute('src', imgVs);
                img.setAttribute('alt', 'img versus');
                players.appendChild(img);

                players.appendChild(this.createPlayerEl(players.querySelectorAll('.player').length));
                return;
            };

        } 
        // this.users = [];
        let main = document.createElement('main');
        main.classList.add('selection-view');

        let commands = document.createElement('div');
        commands.classList.add('commands');
        commands.appendChild((new Btn()).flutuanteAdd({
            click: (e) => (Modal.shModal(e.target))
        }));
        
        main.appendChild(commands);
        
        let container = document.createElement('div');
        container.classList.add('container');
        main.appendChild(container);
        
        let players = document.createElement('div');
        players.classList.add('players');
        container.appendChild(players);

        let img = document.createElement('img');
        img.classList.add('vs');
        img.classList.add('default');
        img.setAttribute('src', imgVs);
        img.setAttribute('alt', 'img versus');
        players.appendChild(img);

        let formAdd = document.createElement('form');
        formAdd.setAttribute('data-validate','');
        formAdd.addEventListener('submit', (e) => this.addUser(e));
        
        let formSpan = document.createElement('span');
        formSpan.classList.add('form-desc');
        formSpan.appendChild(document.createTextNode('Informe um usuário do github'));
        formAdd.appendChild(formSpan);

        let formAddInput = document.createElement('input');
        formAddInput.setAttribute('type', 'text');
        formAddInput.setAttribute('name', 'user');
        formAddInput.setAttribute('placeholder', 'Exs: jnetto23, diego3g, devlindo');
        formAddInput.setAttribute('autofocus', '');
        formAdd.appendChild(formAddInput);
                
        let formAddBtn = (new Btn()).default('Incluir');
        formAddBtn.setAttribute('type', 'submit');
        formAdd.appendChild(formAddBtn);
        
        Modal.create('add-new-user' , 'Incluir novo usuário', formAdd);
        return main;
        
    };

    async addUser(e) {
        e.preventDefault();
        let userInput = (e.target).querySelector('input');
        let userValue = userInput.value.trim().toLowerCase();
        if(userValue === 'devlindo') userValue = 'filipedeschamps';

        // verifica se o campo não esta vazio
        if(userValue.length === 0) {
            new AlertWithTimer('error', 'Por favor, informe um usuário!');
            userInput.focus();
            return;
		};
        
        // Verifica se o usuario ja foi selecionado
        for(let user of this.users) {
            if(user.login === userValue) {
                new AlertWithTimer('error', 'Usuário ja selecionado!');
                userInput.value = '';
                userInput.focus();
                return;
            };
        };
        
        // Faz a consulta do usuário
        try{
            const response = await api.get(`users/${userValue}`);
            const { login, name, avatar_url, created_at, followers, public_repos, repos_url } = response.data;
            this.users.push({
                login, 
                name, 
                avatar_url, 
                created_at, 
                followers, 
                public_repos, 
                repos_url
            });

            if(!sessionStorage.getItem('hasUserInCombate')) {
                sessionStorage.setItem('hasUserInCombate', true);
            };
            
            userInput.value = '';
		    Modal.shModal();
		    this.render();
			
        } catch (e) {
            new AlertWithTimer('error', 'Usuário Inexistente!');
            userInput.value = '';
            userInput.focus();
		};
    };

    createPlayerEl(user) {
		
        let {login, name, avatar_url} = this.users[user] || this.users[0];
        name = name || 'Não Informado';
        
		let player = document.createElement('div');
        player.classList.add('player');
        player.setAttribute('data-user', login);
        

		let img = document.createElement('img');
		img.classList.add('player-self');
		img.setAttribute('src', avatar_url);
		img.setAttribute('alt', 'self user github');
		player.appendChild(img);

		let info = document.createElement('div');
		info.classList.add('player-info');
		
		let userName = document.createElement('span');
		userName.classList.add('name');
		userName.appendChild(document.createTextNode(name));
		info.appendChild(userName);
		
		let userLogin = document.createElement('span');
		userLogin.classList.add('login');
		userLogin.appendChild(document.createTextNode(login));
		info.appendChild(userLogin);
		
		player.appendChild(info);
		
		let btnRemove = document.createElement('button');
		btnRemove.setAttribute('data-remove', 'card');
		btnRemove.classList.add('close');
        btnRemove.appendChild(document.createTextNode('x'));
        btnRemove.addEventListener('click', (player) => this.removePlayerEl(player));
		player.appendChild(btnRemove);
        
		return player;
        
    };
    
    removePlayerEl(user) {
        
        if(((user.target).parentNode).previousSibling === null && ((user.target).parentNode).nextSibling !== null) {
            let img = (((user.target).parentNode).nextSibling);
            img.remove();
       
        } else if(((user.target).parentNode).previousSibling !== null && ((user.target).parentNode).nextSibling === null) {
            let img = (((user.target).parentNode).previousSibling);
            img.remove();
        
        } else if(((user.target).parentNode).previousSibling !== null && ((user.target).parentNode).nextSibling !== null) {
            let img = (((user.target).parentNode).previousSibling);
            img.remove();
        } 

        ((user.target).parentNode).remove();
        this.removeUser(((user.target).parentNode).getAttribute('data-user'));


        if(document.querySelectorAll('.player').length <= 2) {
            let main = document.querySelector('main');
            if(main.classList.contains('multi-players')) {
                main.classList.remove('multi-players')
            };
            if(!main.classList.contains('two-players')) {
                main.classList.add('two-players') 
            };
        };

        if(document.querySelectorAll('.player').length < 2) {

            if(document.querySelector('.commands button.btn-flutuante-fight')) (document.querySelector('.commands button.btn-flutuante-fight')).remove();
        };

        if(document.querySelectorAll('.player').length < 1) {
            (document.querySelector('main')).setAttribute('class', 'selection-view');

            let img = document.createElement('img');
            img.classList.add('vs');
            img.classList.add('default');
            img.setAttribute('src', imgVs);
            img.setAttribute('alt', 'img versus');
            (document.querySelector('.players')).appendChild(img);

        };



    };

    removeUser(login) {
        for(let [i, user] of this.users.entries()) {
            if(user.login === login) {
                this.users.splice(i, 1);
            };
        };
        return;
    };

    result() {
        (document.querySelector('main')).innerHTML = '';
        (document.querySelector('#add-new-user')).remove();
        new Route('result-view', this.users);

    };
}