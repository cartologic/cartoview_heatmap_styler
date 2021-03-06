import UrlAssembler from 'url-assembler'

class URLS {
    constructor(urls) {
        this.urls = urls
    }
    encodeURL = (url) => {
        return encodeURIComponent(url).replace(/%20/g, '+')
    }
    getParamterizedURL = (url, query) => {
        return UrlAssembler(url).query(query).toString()
    }
    getLayersApiURL = (username, userMaps = false, limit, offset,query={}) => {
        let params = {
            'limit': limit,
            'offset': offset,
            'permission':"change_layer_style",
            'geom_type':'point',
            ...query
        }
        if (userMaps) {
            params['owner__username'] = username
        }
        const url = UrlAssembler(this.urls.layersAPI).query(params).toString()
        return url
    }
    getLayersApiSearchURL = (username, userMaps = false,text) => {
        let params = {'title__contains':text,'permission':"change_layer_style",'type':'point'}
        if (userMaps) {
            params['owner__username'] = username
        }
        const url = UrlAssembler(this.urls.layersAPI).query(params).toString()
        return url
    }
    getProxiedURL = (url) => {
        const proxy = this.urls.proxy
        let proxiedURL = url
        if (proxy) {
            proxiedURL = this.urls.proxy + this.encodeURL(url)
        }
        return proxiedURL
    }
}
export default URLS
