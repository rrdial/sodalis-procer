<!DOCTYPE html>
<html lang="en" ng-app="sodalisProcer">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Sodalis Procer</title>

    <!-- Andular.js -->
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.18/angular.min.js"></script>
    <script type="text/javascript" src="app.<?= filemtime(__DIR__ . '/app.js') ?>.js"></script>

    <!-- Bootstrap -->
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body ng-controller="HealthHistoryController as health">
    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">
        <div class="container">
            <h1>Hello, {{"world"}}!</h1>
            <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
        </div>
    </div>

    <div class="container">
        <!-- Example row of columns -->
        <div class="row" style="page-break-after:always;" ng-repeat="rows in health.parsedForms">
            <div class="col-md-12">
                <h2>{{rows[7] + ' ' + rows[8]}}</h2>
                <address>
                    {{rows[9]}}<br>
                    {{ rows[10] }}<br ng-if="rows[10]">
                    {{ rows[11] + ', ' + rows[12] + ' ' + rows[13] }}
                </address>
                <ol start="0">
                    <li ng-repeat="field in rows track by $index">
                        {{ field }}
                    </li>
                </ol>
            </div>
        </div>

        <hr>

        <footer>
            <p>&copy; Learning Gate Community School 2014</p>
        </footer>
    </div> <!-- /container -->


<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="bootstrap/js/bootstrap.min.js"></script>
</body>
</html>