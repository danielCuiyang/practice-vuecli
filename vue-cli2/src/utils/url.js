import url from 'url'

var urlPath = window.location.href
var urlParam = url.parse(urlPath,true).query

var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端 
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var backToApp;

if(isAndroid){
    backToApp = function(){
        window.AndroidWebView.backToApp()
        // window.android.backToApp()
    }
}
else{
    backToApp = function(){
        window.webkit.messageHandlers.backToApp.postMessage('');
    }
}

export {urlParam,backToApp}