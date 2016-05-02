import {autoinject, singleton, useView} from 'aurelia-framework';
import {bindable} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@singleton()
@autoinject
export class Users {
  count = 0;
  defaultHeading: string = 'Github Users';
  heading: string = this.defaultHeading;
  username: string = '';
  users: Users[] = [];

  constructor(private http: HttpClient) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://api.github.com/');
    });
    this.fetchData();
  }

  cardClicked(username: string) {
    console.log('usernameChanged');
    this.count++;
    this.heading = username + ' clicked';
  }

  async fetchData(): Promise<any> {
    let response = await this.http.fetch('users')
      .then(response => response.json())
      .then(users => this.users = users);
  }

  async activate() {
    console.log("activate");
    this.heading = this.defaultHeading;
  }
  
}
