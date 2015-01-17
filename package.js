Package.describe({
  name: 'loredanacirstea:meteor-tabular-filter',
  summary: 'Collection filter based on aldeed:simple-schema structure.Output: Mongo Selector.',
  version: '0.1.1_1',
  git: 'https://github.com/loredanacirstea/meteor-tabular-filter.git',
  readme: 'https://raw.githubusercontent.com/loredanacirstea/meteor-tabular-filter/master/README.md'
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