import api from '../../api';
import mp3 from './img/palmas.mp3';
import './style.css';

export default class Result {
    constructor(data) {
        this.users = data;
        this.result = [];
        this.resultTb = [];
        this.combatesTb = [];
    };

    async render() {
        let main = document.createElement('main');
        main.classList.add('result-view');
        main.classList.add('loading');
        main.appendChild(document.createTextNode('Loading...'))
        
        this.renderResut();
        return main;
    };

    async renderResut() {
        await this.combates();

        let container = document.createElement('div');
        container.classList.add('container');

        let qualific = await this.qualificEl();
        container.appendChild(qualific);

        // Resume
        let resume = await this.resumeEl();
        container.appendChild(resume);
        
        // HR
        let hr = document.createElement('hr');
        container.appendChild(hr);
        
        // Tabelas
        let tables = await this.tablesEl();
        container.appendChild(tables);

        let main = document.querySelector('main');
        main.innerHTML = '';
        main.classList.remove('loading');
        main.appendChild(container);
        
        let audio = document.createElement('audio');
        audio.setAttribute('autoplay', '');
        
        let mp3src = document.createElement('source');
        mp3src.setAttribute('src', mp3);
        audio.appendChild(mp3src);
        
        main.appendChild(audio);
    };

    qualificEl() {
        let pos = [];
        for(let user of this.result) { 
            pos.push(user.pos);
        };
        let posPodium = Math.max.apply(null, pos);
        
        // Classificação
        let qualific = document.createElement('div');
        qualific.classList.add('qualific');

        // Resumo
        let result = document.createElement('div');
        result.classList.add('result');
        qualific.appendChild(result);

        // Podium
        let podium = document.createElement('div');
        podium.classList.add('podium');
        
        let podiumCorpo = document.createElement('div');
        podiumCorpo.classList.add('corpo');

        if(posPodium >= 2) {
            let rp2 = document.createElement('div');
            rp2.classList.add('result-2');
            for(let user of this.result) {
                if(user.pos === 2) {
                    let img = document.createElement('img');
                    img.classList.add("result-user");
                    img.setAttribute("src", this.getAvatarByLogin(user.login));
                    img.setAttribute("width","80");
                    img.setAttribute("height","80");
                    img.setAttribute("alt","img user 2 colocado");
                    rp2.appendChild(img);
                };
            };
            result.appendChild(rp2);           
            
            let p2 = document.createElement('div');
            p2.classList.add('podium-2');
            let p2Span = document.createElement('span');
            p2Span.classList.add('top');
            p2.appendChild(p2Span);
            let p2Div = document.createElement('div');
            p2Div.classList.add('corpo');
            p2Div.appendChild(document.createTextNode('2'));
            p2.appendChild(p2Div);
            podiumCorpo.appendChild(p2);
        };

        let rp1 = document.createElement('div');
        rp1.classList.add('result-1');
        for(let user of this.result) {
            if(user.pos === 1) {
                let img = document.createElement('img');
                img.classList.add("result-user");
                img.setAttribute("src", this.getAvatarByLogin(user.login));
                img.setAttribute("width","80");
                img.setAttribute("height","80");
                img.setAttribute("alt","img user 1 colocado");
                rp1.appendChild(img);
            };
        };
        result.appendChild(rp1);

        let p1 = document.createElement('div');
        p1.classList.add('podium-1');
        let p1Span = document.createElement('span');
        p1Span.classList.add('top');
        p1.appendChild(p1Span);
        let p1Div = document.createElement('div');
        p1Div.classList.add('corpo');
        p1Div.appendChild(document.createTextNode('1'));
        p1.appendChild(p1Div);
        podiumCorpo.appendChild(p1);
        
        if(posPodium >= 3) {
            let rp3 = document.createElement('div');
            rp3.classList.add('result-3');
            for(let user of this.result) {
                if(user.pos === 3) {
                    let img = document.createElement('img');
                    img.classList.add("result-user");
                    img.setAttribute("src", this.getAvatarByLogin(user.login));
                    img.setAttribute("width","80");
                    img.setAttribute("height","80");
                    img.setAttribute("alt","img user 3 colocado");
                    rp3.appendChild(img);
                };
            };
            result.appendChild(rp3);

            let p3 = document.createElement('div');
            p3.classList.add('podium-3');
            let p3Span = document.createElement('span');
            p3Span.classList.add('top');
            p3.appendChild(p3Span);
            let p3Div = document.createElement('div');
            p3Div.classList.add('corpo');
            p3Div.appendChild(document.createTextNode('3'));
            p3.appendChild(p3Div);
            podiumCorpo.appendChild(p3);
        };

        let podiumBase = document.createElement('div');
        podiumBase.classList.add('base');
        podiumBase.appendChild(document.createElement('span'));
        let podiumBase2 = document.createElement('div');
        podiumBase2.classList.add('base-2');
        podiumBase2.appendChild(document.createElement('span'));
        let podiumBase3 = document.createElement('div');
        podiumBase3.classList.add('base-3');
        podiumBase3.appendChild(document.createElement('span'));
        
        podium.appendChild(podiumCorpo);
        podium.appendChild(podiumBase);
        podium.appendChild(podiumBase2);
        podium.appendChild(podiumBase3);
        qualific.appendChild(podium);
        return qualific;
        
    };

    resumeEl() {
        let resume = document.createElement('div');
        resume.classList.add('resumo');
        resume.classList.add('tables');
        resume.appendChild(this.resultTb[0]);

        return resume;
    };

    tablesEl() {
        let tables = document.createElement('div');
        tables.classList.add('tables');

        for(let tb of this.combatesTb) {
            tables.appendChild(tb);
        };

        return tables;

    };

    async combates() {
        
        for(let [i, user] of this.users.entries()) {
            this.users[i]['repos']  = await this.getInfoRepos(user);
        };
        
        this.combatesTb.push(await this.cb1());
        this.combatesTb.push(await this.cb2());
        this.combatesTb.push(await this.cb3());
        this.combatesTb.push(await this.cb4());
        this.combatesTb.push(await this.cb5());
        this.combatesTb.push(await this.cb6());
        this.combatesTb.push(await this.cb7());
        this.combatesTb.push(await this.cb8());
        
        this.resultTb.push(await this.resume());
    };

    createTableEl(data) {
        let tabela = document.createElement('div');
        tabela.classList.add('tabela');

        let title = document.createElement('span');
        title.classList.add('title');
        title.appendChild(document.createTextNode(data.title));
        tabela.appendChild(title);
        
        if(data.helper) {
            let helper = document.createElement('span');
            helper.classList.add('title-helper');
            helper.appendChild(document.createTextNode(data.helper));
            tabela.appendChild(helper);
        };

        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let thpos = document.createElement('th');
        thpos.appendChild(document.createTextNode('#'));
        thead.appendChild(thpos);
        let thname = document.createElement('th');
        thname.appendChild(document.createTextNode('Usuário'));
        thead.appendChild(thname);
        let thpts = document.createElement('th');
        thpts.appendChild(document.createTextNode('Pts.'));
        thead.appendChild(thpts);
        table.appendChild(thead);
        
        let tbody = document.createElement('tbody');
        
        let i = 0;
        let pts = -1;
        for(let user of data.data) {
            
            let tr = document.createElement('tr');
            let pos = document.createElement('td');
            
            if(user.pts !== pts) {
                i++;
                pts = user.pts
            };

            pos.appendChild(document.createTextNode(i));            
            let name = document.createElement('td');
            name.appendChild(document.createTextNode(this.getNameByLogin(user.login)));
            let span = document.createElement('span');
            span.classList.add('login');
            span.appendChild(document.createTextNode(` (${user.login})`));
            name.appendChild(span);
            let ptsEl = document.createElement('td');
            ptsEl.appendChild(document.createTextNode(user.pts));
            tr.appendChild(pos);
            tr.appendChild(name);
            tr.appendChild(ptsEl);
            tbody.appendChild(tr);

        };

        table.appendChild(tbody);
        tabela.appendChild(table);
        return tabela;
    };

    orderResult(data) {
        let dataOrder = data.sort((a,b) => {
            if (a.pts < b.pts) return 1;
            if (a.pts > b.pts) return -1;
            return 0;
        });
        return dataOrder;
    };

    getNameByLogin(login) {
        for(let user of this.users) {
            if(user.login === login) {
                let name = user.name || 'Não Informado';
                return name;
            };
        };
    };

    getAvatarByLogin(login) {
        for(let user of this.users) {
            if(user.login === login) return user.avatar_url;
        };
    };

    async getInfoRepos(user) {
        let totalRepos = user.public_repos;
        if (totalRepos === 0) return [];
        
        let totalPages = Math.trunc(totalRepos / 100) + 1;
        let repos = [];
        
        for(let i = 1; i <= totalPages; i++) {
            let resp = await api.get(`${user.repos_url}?page=${i}&per_page=100`);
            
            for(let [i, repo] of resp.data.entries()) {
                repos[i] = {
                    name: repo.name, 
                    html_url: repo.html_url, 
                    language: repo.language, 
                    size: repo.size, 
                    stargazers_count: repo.stargazers_count
                };
            };
        };
        return repos;
    };

    // 1º Combate
    cb1() {
        let cb1 = {};
        cb1.title = 'Nº de Repositorios';
        cb1.helper = '(1 ponto p/ repo)';
        
        let dataCb1 = [];
        for(let [i, user] of this.users.entries()) {
            let {login, public_repos} = user;
            dataCb1[i] = {login: login, pts: public_repos};
            this.addPts(dataCb1[i]);
        }
        cb1.data = this.orderResult(dataCb1);
        return this.createTableEl(cb1);
    };
    // 2º Combate
    cb2() {
        let cb2 = {};
        cb2.title = 'Nº de Seguidores';
        cb2.helper = '(1 ponto p/ repo)';
        
        let dataCb2 = [];
        for(let [i, user] of this.users.entries()) {
            let {login, followers} = user;
            dataCb2[i] = {login: login, pts: followers};
            this.addPts(dataCb2[i]);
        }
        cb2.data = this.orderResult(dataCb2);
        return this.createTableEl(cb2);
    };
    // 3º Combate
    cb3() {
        let cb3 = {};
        cb3.title = 'Nº de Linguagens';
        cb3.helper = '(1 ponto p/ linguagem)';
        
        let dataCb3 = [];
        for(let [i, user] of this.users.entries()) {
            let {login, repos} = user;

            let lang = [];
            for(let r of repos) {
                lang.push(r.language);
            };
            lang = [... new Set(lang)];
            dataCb3[i] = {login: login, pts: lang.length};
            this.addPts(dataCb3[i]);
        };
        cb3.data = this.orderResult(dataCb3);
        return this.createTableEl(cb3);
    };
    // 4º Combate
    cb4() {
        let cb4 = {};
        cb4.title = 'Peso Total dos Repositórios';
        cb4.helper = '(1 ponto p/ size)';
        
        let dataCb4 = [];
        for(let [i, user] of this.users.entries()) {
            let {login, repos} = user;

            let size = 0;
            for(let r of repos) {
                size += parseInt(r.size);
            }

            dataCb4[i] = {login: login, pts: size};
            this.addPts(dataCb4[i]);
        };
        cb4.data = this.orderResult(dataCb4);
        return this.createTableEl(cb4);
    };
    // 5º Combate
    cb5() {
        let cb5 = {};
        cb5.title = 'Total de Curtidas (Stars)';
        cb5.helper = '(1 ponto p/ star)';
        
        let dataCb5 = [];
        for(let [i, user] of this.users.entries()) {
            let {login, repos} = user;

            let stars = 0;
            for(let r of repos) {
                stars += parseInt(r.stargazers_count);
            }

            dataCb5[i] = {login: login, pts: stars};
            this.addPts(dataCb5[i]);
        };
        cb5.data = this.orderResult(dataCb5);
        return this.createTableEl(cb5);
    };
    // 6º Combate
    cb6() {
        let cb6 = {};
        cb6.title = 'Repositório Mais Pesado';
        cb6.helper = '(1 ponto p/ size)';
        
        let dataCb6 = [];
        for(let [i, user] of this.users.entries()) {
            let {login, repos} = user;

            let sizes = [];
            for(let r of repos) {
                sizes.push(r.size);
            }
            let size = (sizes.length > 0) ? Math.max.apply(null, sizes) : 0;
            dataCb6[i] = {login: login, pts: size};
            this.addPts(dataCb6[i]);
        };
        cb6.data = this.orderResult(dataCb6);
        return this.createTableEl(cb6);
    };
    // 7º Combate
    cb7() {
        let cb7 = {};
        cb7.title = 'Repositório Mais Curtido';
        cb7.helper = '(1 ponto p/ star)';
        
        let dataCb7 = [];
        for(let [i, user] of this.users.entries()) {
            let {login, repos} = user;

            let stars = [];
            for(let r of repos) {
                stars.push(r.stargazers_count);
            }
            let star = (stars.length) ? Math.max.apply(null, stars) : 0;
            dataCb7[i] = {login: login, pts: star};
            this.addPts(dataCb7[i]);
        };
        cb7.data = this.orderResult(dataCb7);
        return this.createTableEl(cb7);
    };
    // 8º Combate
    cb8() {
        let cb8 = {};
        cb8.title = 'Tempo de GitHub';
        cb8.helper = '(1 ponto p/ dia)';
        
        let dataCb8 = [];
        for(let [i, user] of this.users.entries()) {
            let {login, created_at} = user;
            
            let timeDiff = Math.abs(new Date().getTime() - new Date(created_at).getTime());
            let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
            
            dataCb8[i] = {login: login, pts: diffDays};
            this.addPts(dataCb8[i]);
        };
        cb8.data = this.orderResult(dataCb8);
        return this.createTableEl(cb8);
    };
    // Resume
    resume() {
        let resume = {};
        resume.title = 'Resumo';
        
        let data = [];
        for(let [i, user] of this.users.entries()) {
            let {login, pts} = user;
            data[i] = {login: login, pts: pts};            
        };
        resume.data = this.orderResult(data);      

        let p = 0;
        let pts = -1;
        let result = [];
        for(let u of resume.data) {
            if(u.pts !== pts) {
                p++;
                pts = u.pts
            };
            result.push({pos: p, login: u.login, pts: u.pts});
        };
        this.result = result;

        return this.createTableEl(resume);        
    };

    addPts(cb) {
        for(let [i, u] of this.users.entries()) {
            if(u.login === cb.login) {
                if(this.users[i].pts === undefined) {
                    this.users[i].pts = cb.pts;
                } else {
                    this.users[i].pts += cb.pts;
                }; 
            };
        };
        return;
    };
}