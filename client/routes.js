Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('home', {
    path: '/',
    template: 'home'
  });

  this.route('register', {
    path: '/register',
    template: 'register'
  });

  this.route('login', {
    path: '/login',
    template: 'login'
  });

  this.route('settings', {
    path: '/settings',
    template: 'settings'
  })
});

