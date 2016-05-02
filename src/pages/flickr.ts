import {autoinject, singleton, bindable} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

import * as $ from "jquery";
import 'bootstrap';
import 'bootstrap-tagsinput';

@singleton()
@autoinject
export class Flickr {
  count: number = 1;
  heading = 'Flickr';
  images: any[] = [];
  url: string;
  http: HttpClient;
  @bindable tags: string[] = ["cathedral"];
  

  constructor(http: HttpClient) {
    this.http = http;
    this.fetchData();
  
    setInterval(() => {
      this.addTag(this.count + "");
      this.count++;
    }
      , 3000);
   
  }

  async fetchData() {
    this.url = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=' + this.tags + '&tagmode=any&format=json'
    console.log("fetchData:\n" + this.url);
    let response = await this.http.jsonp(this.url).then(response => {
      this.images = response.content.items;
    });
  }

  addTag(tag: string) {
    console.log("new tag: " + tag);
    this.tags.push(tag);
  }

  async activate() {
    console.log("activate");
  }

  /*  
  canDeactivate(){
      return confirm('Are you sure you want to leave?');
    }
  */
}