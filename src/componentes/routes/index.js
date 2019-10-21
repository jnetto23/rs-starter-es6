import Init from '../../pages/init';
import Selection from '../../pages/selection';
import Result from '../../pages/result';

export default class Routes {
    constructor(r, data) {
        
        const init = new Init();
        const selection = new Selection();
        const result = new Result(data);


        switch(r) {
            case 'selection-view':
                this.render(selection);    
                break
            
            case 'result-view':
                this.render(result);    
                break
            
            default:
                this.render(init);
        };
    };
                
    async render(r) {
        const app = document.querySelector('#app');
        const main = app.querySelector('main');
        if(main) main.remove();
        let view = await r.render();
        app.insertBefore(view, (app.querySelector('header')).nextSibling);
    }
}