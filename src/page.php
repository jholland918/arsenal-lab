<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="icon" href="favicon.ico">

        <title>Arsenal Lab</title>

        <!-- Bootstrap core CSS -->
        <!-- <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet"> -->
        <!-- <link href="//maxcdn.bootstrapcdn.com/bootswatch/3.2.0/darkly/bootstrap.min.css" rel="stylesheet"> -->
        <link href="//maxcdn.bootstrapcdn.com/bootswatch/3.2.0/darkly/bootstrap.min.css" rel="stylesheet">

        <!-- Custom styles for this template -->
        <link href="/arsenal-lab/styles/main.css?bust=<?= time(); ?>" rel="stylesheet">
        <!-- <link href="/arsenal-lab/styles/main.css?version=20140724-0041" rel="stylesheet"> -->

        <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
        <script src="/arsenal-lab/vendor/ie10-viewport-bug-workaround.js"></script>

        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
          <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>

    <body>

        <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="/arsenal-lab/">Arsenal Lab</a>
                </div>
                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav">
                        <li><a id="nav-create" href="/arsenal-lab/arsenal/create">Create</a></li>
                    </ul>
                </div><!--/.nav-collapse -->
            </div>
        </div>

        <div id="shell" class="container"></div><!-- /.container -->
        
        <!-- Bootstrap core JavaScript
        ================================================== -->
        <!-- Placed at the end of the document so the pages load faster -->
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <script src="/arsenal-lab/bower_components/lodash/dist/lodash.min.js"></script>
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
        <script src="/arsenal-lab/bower_components/rsvp/rsvp.min.js"></script>
        <script src="/arsenal-lab/bower_components/page/index.js"></script>
        <script src="/arsenal-lab/bower_components/store-js/store.min.js"></script>
        <script data-main="/arsenal-lab/app/main.js?bust=<?= time(); ?>" src="/arsenal-lab/bower_components/requirejs/require.js"></script>
        <!-- <script data-main="/arsenal-lab/app/main.js?version=20140724" src="/arsenal-lab/bower_components/requirejs/require.js"></script> -->
    </body>
</html>
