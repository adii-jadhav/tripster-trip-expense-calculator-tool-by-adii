
//import {io} from 'socket.io-client';
import { w3cwebsocket } from "websocket";
var triggers = {
    "open": [],
    "quote": [],
    "order": []

};
export default class websocketIoClient {


    static ws;
    constructor(url, cred, callbacks) {

        this.url = url;
        this.cred = cred;
        // console.log("cred ", cred);
        // this.callbacks = callbacks;
        //this.ws = new w3cwebsocket(this.url, null, { rejectUnauthorized: false });

        // this.ws = null;
    }



    //connect to shoonyas web socket client
    conenctTOWs(cred, callbacks) {

        console.log(callbacks);
        //callbacks to the app are set here
        this.set_callbacks(callbacks);
        if (this.cred.apikey === null || this.cred.url === null) return "apikey or url is missing";


        websocketIoClient.ws = new w3cwebsocket(this.url, null, { rejectUnauthorized: false });

        websocketIoClient.ws.onopen = function (evt) {
            setInterval(function () {
                var _hb_req = '{"t":"h"}';
                console.log("test");
                websocketIoClient.ws.send(_hb_req);
            }, 4000);

            //prepare the data
            let values = { "t": "c" };
            // console.log(this.cred,this.url);
            values["uid"] = cred?.uid;
            values["actid"] = cred?.actid;
            values["susertoken"] = cred?.apikey;
            values["source"] = "API";

            websocketIoClient.ws.send(JSON.stringify(values));
            //resolve()

        };
        websocketIoClient.ws.onmessage = function (evt) {

            var result = JSON.parse(evt.data);
            console.log("result is : ", result);

            if(result.t == 'ck')
            {
                 trigger("open", [result]);
            }
            if( result.t == 'tk' || result.t == 'tf')
            {
                 trigger("quote", [result]);
            }
            if( result.t == 'dk' || result.t == 'df')
            {
                 trigger("quote", [result]);
            }
            if(result.t == 'om')
            {
                 trigger("order", [result]);
            }

        };
        websocketIoClient.ws.onerror = function (evt) {
            console.log("error::", evt)
            trigger("error", [JSON.stringify(evt.data)]);

        };
        websocketIoClient.ws.onclose = function (evt) {
            console.log("Socket closed...")
            trigger("close", [JSON.stringify(evt.data)]);
        };

    }

    set_callbacks (callbacks){
        if (callbacks.socket_open !== undefined) {
            this.on('open', callbacks.socket_open);
        }
        if (callbacks.socket_close !== undefined) {
            this.on('close', callbacks.socket_close);
        }
        if (callbacks.socket_error !== undefined) {
            this.on('error', callbacks.socket_error);
        }
        if (callbacks.quote !== undefined) {
            this.on('quote', callbacks.quote);
        }
        if (callbacks.order !== undefined) {
            this.on('order', callbacks.order);
        }
    }

    on(e, callback){
        if (triggers.hasOwnProperty(e)) {
            triggers[e].push(callback);
        }
    };

    send(data){
        websocketIoClient.ws.send(data);
    };

    subscribe(instrument) {
        let values = {};
        values['t'] = 't';
        values['k'] = instrument
        console.log('test2');
        this.send(JSON.stringify(values));
    }
    print() {
        console.log("print");
    }

};

function trigger(e, args) {
    if (!triggers[e]) return
    for (var n = 0; n < triggers[e].length; n++) {
         triggers[e][n].apply(triggers[e][n], args ? args : []);
    }
}