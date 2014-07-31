<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>arsenal-lab</title>
    <!-- build:css -->
      <link href="//maxcdn.bootstrapcdn.com/bootswatch/3.2.0/darkly/bootstrap.min.css" rel="stylesheet">
      <link href="css/styles.css" rel="stylesheet">
    <!-- endbuild -->
    <!-- build:js -->
      <script src="app/require.config.js"></script>
      <script data-main="app/startup" src="bower_modules/requirejs/require.js"></script>
    <!-- endbuild -->
  </head>
  <body>
    <nav-bar params="route: route"></nav-bar>
    <div id="page" class="container" data-bind="component: { name: route().page, params: route }"></div>
  </body>
</html>
