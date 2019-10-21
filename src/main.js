import './assets/css/style.css';
import Route from './componentes/routes';

const App = document.getElementById('app');
const Logo = document.getElementById('logo');

// Function with import
if(!document.querySelector('main')) {
    new Route();
};

Logo.addEventListener('click', () => {
    let main = App.querySelector('main');
    if(!main.classList.contains('init-view')) {
        let resp = confirm('Tem certeza que deseja voltar? \n Todos os dados poderão ser perdidos.')
        if(resp) {
            main.remove();
            sessionStorage.clear();
            new Route();
        };
    };
});