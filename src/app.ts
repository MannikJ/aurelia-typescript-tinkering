import {Router, RouterConfiguration} from 'aurelia-router'
import {Settings} from './services/Settings';

export class App {
  router: Router;
  settings: Settings = new Settings();

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome', moduleId: this.settings.pagesDir + 'welcome', nav: true, title: 'Welcome' },
      { route: 'users', name: 'users', moduleId: this.settings.pagesDir + 'users', nav: true, title: 'Github Users' },
      { route: 'flickr', name: 'flickr', moduleId: this.settings.pagesDir + 'flickr', nav: true, title: 'FlickR Images' },
      { route: 'child-router', name: 'child-router', moduleId: this.settings.pagesDir + 'child-router', nav: true, title: 'Child Router' },
      { route: 'test', name: 'test', moduleId: this.settings.pagesDir + 'test', nav: true, title: 'Test' }
    ]);

    this.router = router;
  }
}
