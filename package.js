Package.describe({
  name: "loredanacirstea:meteor-tabular-filter",
  summary: "Collection filter based on aldeed:simple-schema structure.Output: Mongo Selector.",
  version: "0.2.2",
  git: "https://github.com/loredanacirstea/meteor-tabular-filter.git"
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.use(['jquery', 'deps', 'templating', 'ui', 'blaze', 'reactive-var', 'session'], 'client');

  api.addFiles([
    'filter.html',
    'filter.js',
    'filter.css'
  ], 'client');
});
