export default {
    getQueryString(params : any) {
        if (!params) {
            return "";
        }
        var esc = encodeURIComponent;
        return "?" + Object.keys(params)
            .map(k => esc(k) + "=" + esc(params[k]))
            .join("&");
    }
};