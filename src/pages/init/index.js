import Route from '../../componentes/routes';
import Btn from '../../componentes/buttons';

export default class Init {
    constructor() {};
    
    render() {
        sessionStorage.clear();
        
        let main = document.createElement('main');
        main.classList.add('init-view');
        
        main.appendChild((new Btn()).pressEnter({
            click: () => {
                this.destroy();
                new Route('selection-view')
            }
        }));
                
        return main;
    };

    destroy() {
        (document.querySelector('main')).innerHTML = '';
    };
    
}