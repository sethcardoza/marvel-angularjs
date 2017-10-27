// karma.conf.js
module.exports = function(config) {
  config.set({
    files: [
      'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.6/angular.min.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.6/angular-route.js',
      'https://cdn.jsdelivr.net/npm/lodash@4.17.4/lodash.min.js',
      'js/**/*.js',
      'test/**/*.js',
      {
        pattern: 'js/app.config.default.js',
        watched: false
      },
    ],

    // coverage reporter generates the coverage
    reporters: ['progress', 'coverage'],

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'js/**/*.js': ['coverage']
    },

    // optionally, configure the reporter
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    }
  });
};
