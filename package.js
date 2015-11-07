Package.describe({
  name: "loredanacirstea:meteor-tabular-filter",
  summary: "Collection filter based on aldeed:simple-schema structure.Output: Mongo Selector.",
  version: "0.1.3",
  git: "https://github.com/loredanacirstea/meteor-tabular-filter.git"
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.use(['jquery', 'deps', 'templating', 'ui', 'blaze', 'reactive-var', 'session'], 'client');

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