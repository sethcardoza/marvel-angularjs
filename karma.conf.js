// karma.conf.js
module.exports = function (config) {
  config.set({
    autoWatch: true,
    basePath: '',
    browsers: [
      //'Chrome',
      // 'FirefoxDeveloper'
      'PhantomJS'
    ],
    // optionally, configure the reporter
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },
    exclude: [
      'js/app.config.default.js'
    ],
    files: [
      'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.6/angular.min.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.6/angular-mocks.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.6/angular-route.js',
      'https://cdn.jsdelivr.net/npm/lodash@4.17.4/lodash.min.js',
      'vendor/ng-infinite-scroll-1.0.0.min.js',
      'js/app.js',
      'js/app.config.js',
      'js/app.routes.js',
      'js/marvel.factory.js',
      'js/normalizer.factory.js',
      'js/characters/characters.module.js',
      'js/characters/characters.controller.js',
      'js/characters/characters-normalizer.factory.js',
      'js/comics/comics.module.js',
      'js/comics/comics.controller.js',
      'js/comics/comics-normalizer.factory.js',
      'js/creators/creators.module.js',
      'js/creators/creators.controller.js',
      'js/creators/creators-normalizer.factory.js',
      'js/events/events.module.js',
      'js/events/events.controller.js',
      'js/events/events-normalizer.factory.js',
      'js/series/series.module.js',
      'js/series/series.controller.js',
      'js/series/series-normalizer.factory.js',
      'js/stories/stories.module.js',
      'js/stories/stories.controller.js',
      'js/stories/stories-normalizer.factory.js',
      'js/app.spec.js',
      'js/marvel.factory.spec.js',
      'js/normalizer.factory.spec.js',
      'js/characters/characters-normalizer.factory.spec.js',
      'js/characters/characters.controller.spec.js',
      'js/comics/comics-normalizer.factory.spec.js',
      'js/creators/creators-normalizer.factory.spec.js',
      'js/events/events-normalizer.factory.spec.js',
      'js/series/series-normalizer.factory.spec.js',
      'js/stories/stories-normalizer.factory.spec.js',
      'templates/partials/*.html'
    ],
    frameworks: ['jasmine', 'polyfill'],
    plugins: [
      'karma-coverage',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor',
      'karma-phantomjs-launcher',
      'karma-polyfill',
      'karma-spec-reporter'
    ],
    polyfill: ['Object.assign'],
    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'js/**/*.js': ['coverage'],
      // needed to test directives with templateUrl
      'templates/**/*.html': ['ng-html2js']
    },
    // coverage reporter generates the coverage
    reporters: ['spec', 'coverage'],
    ngHtml2JsPreprocessor: {
      // the name of the Angular module to create
      moduleName: "automatedTest.templates"
  },
  });
};
