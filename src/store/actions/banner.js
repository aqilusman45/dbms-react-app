export class BannerActions {
    static ADD_BANNER = 'ADD_BANNER';
    static CLEAR_BANNER = 'CLEAR_BANNER';
    static REMOVE_BANNER = 'REMOVE_BANNER'

    static addBanners(payload){
        return {
            type: BannerActions.ADD_BANNER,
            payload,
        }
    }
    
    static clearBanners(payload){
        return{
            type: BannerActions.CLEAR_BANNER,
            payload,
        }
    }

    static removeBanner(payload){
        return {
            type: BannerActions.REMOVE_BANNER,
            payload,
        }
    }
    
}