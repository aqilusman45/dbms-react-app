export class LogoActions {
    static ADD_LOGO = 'ADD_LOGO';
    static CLEAR_LOGO = 'CLEAR_LOGO';

    static addLogo(payload){
        return {
            type: LogoActions.ADD_LOGO,
            payload,
        }
    }
    
    static clearLogo(payload){
        return{
            type: LogoActions.CLEAR_LOGO,
            payload,
        }
    }
}