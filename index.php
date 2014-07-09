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
<body ng-controller="RegistrationController as registration">
    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">
        <div class="container">
            <h1>Hello, {{"world"}}!</h1>
            <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
        </div>
    </div>

    <div class="container">
        <div style="page-break-after:always;border: 1px solid blue" ng-repeat="student in registration.students">
            <div class="row">
                <div class="col-xs-12">
                    <h2>{{ student.name.last + ', ' + student.name.first }}</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-6">
                    <label>Home Address:</label>
                    <address>
                        {{ student.addr.home.line1 }}<br>
                        {{ student.addr.home.line2 }}<br>
                        {{ student.addr.home.city + ', ' + student.addr.home.state + ' ' + student.addr.home.zip }}
                    </address>
                </div>
                <div class="col-xs-6">
                    <label>Mailing Address (if different):</label>
                    <address ng-show="student.addr.mailing.line1">
                        {{ student.addr.mailing.line1 }}<br>
                        {{ student.addr.mailing.line2 }}<br>
                        {{ student.addr.mailing.city + ', ' + student.addr.mailing.state + ' ' + student.addr.mailing.zip }}
                    </address>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-2">
                    <label>Gender:</label> {{ student.gender }}
                </div>
                <div class="col-xs-4">
                    <label>Date of Birth:</label> {{ student.dateOfBirth | date : 'MM/dd/yy' }}
                </div>
                <div class="col-xs-4">
                    <label>Social Security #:</label> {{ student.ssn }}
                </div>
                <div class="col-xs-2">
                    <label>Age:</label> ???
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <label>Name of person student lives with:</label> {{student.livesWith.first + ' ' + student.livesWith.last}}
                </div>
            </div>
            <div class="row">
                <div class="col-xs-6">
                    <label>Guardian:</label>
                    <div>
                        {{student.guardians[0].name.last}}
                    </div>
                </div>
            </div>
        </div>
    </div> <!-- /container -->
    <div class="container">
        <hr>
        <footer>
            <p>&copy; Learning Gate Community School <?= date("Y") ?></p>
        </footer>
    </div>


<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="bootstrap/js/bootstrap.min.js"></script>
</body>
</html>