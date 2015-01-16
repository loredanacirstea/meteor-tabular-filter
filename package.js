Package.describe({
  name: 'loredanacirstea:meteor-tabular-filter',
  summary: 'This package offers a collection filter based on the aldeed:simple-schema structure of your collection. It outputs a Mongo Selector based on the chosen options from the UI. It is compatible with aldeed:tabular selector.',
  version: '0.1.0',
  git: 'https://github.com/loredanacirstea/meteor-tabular-filter'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.2.1');

  api.use('jquery','client');
  api.use(['livedata', 'underscore', 'deps', 'templating', 'ui', 'blaze', 'ejson', 'reactive-var', 'session'], 'client');
  api.use('webapp', ['client', 'server']);
  api.use('meteor');
  api.use('standard-app-packages');
  api.addFiles('lib/filter.html');
  api.addFiles('lib/filter.js');
  api.addFiles('lib/filter.css');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('loredanacirstea:meteor-tabular-filter');
  api.addFiles('tests/filter-tests.js');
});
