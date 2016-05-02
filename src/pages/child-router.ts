import {Router, RouterConfiguration} from 'aurelia-router'
import {autoinject, singleton} from 'aurelia-framework';
import {Settings} from 'services/settings';

@autoinject
export class ChildRouter {
  heading = 'Child Router';
  router: Router;
  pagesDir: string = new Settings().pagesDir;

  configureRouter(config: RouterConfiguration, router: Router) {
    console.log(this.pagesDir);
    config.map([
      { route: ['', 'welcome'], name: 'welcome', moduleId: './welcome', nav: true, title: 'Welcome' },
      { route: 'users', name: 'users', moduleId: './users', nav: true, title: 'Github Users' },
      { route: 'flickr', name: 'flickr', moduleId: './flickr', nav: true, title: 'FlickR Images' },
      { route: 'child-router', name: 'child-router', moduleId: './child-router', nav: true, title: 'Child Router' },
    ]);

    this.router = router;
  }
}
