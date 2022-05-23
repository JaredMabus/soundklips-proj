import store from '../Redux/store';
import * as actions from '../Redux/actions';
import route from './RouteSwitch';


export default class AccountAPI {
  constructor(method, data) {
    this.uri = `${route.uri}/api/login`
    this.options = {
      method: this.method,
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(this.data)
    } 
  }

  // run(){
  //   var response = await fetch(this.uri, this.options)
  // }
}
