Package.describe({
  name: "loredanacirstea:meteor-tabular-filter",
  summary: "Collection filter based on aldeed:simple-schema structure.Output: Mongo Selector.",
  version: "0.1.1_3",
  git: "https://github.com/loredanacirstea/meteor-tabular-filter.git"
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.2.1');

  api.use(['jquery', 'livedata', 'underscore', 'deps', 'templating', 'ui', 'blaze', 'ejson', 'reactive-var', 'session'], 'client');
  api.use('webapp');
  api.use('meteor');
  api.use('standard-app-packages');
  api.addFiles([
    'lib/filter.html',
    'lib/filter.js',
    'lib/filter.css'
  ], 'client');
});

Package.onTest(function(api) {
  api.use(['loredanacirstea:meteor-tabular-filter', 'tinytest']);
  api.addFiles('tests/filter-tests.js');
});