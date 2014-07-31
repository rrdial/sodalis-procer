<!DOCTYPE html>
<html lang="en" ng-app="sodalisProcer">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Sodalis Procer</title>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="bootstrap/js/bootstrap.min.js"></script>

    <!-- Papa Parse -->
    <script type="text/javascript" src="js/papaparse.min.js"></script>

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
    <div class="jumbotron hidden-print">
        <div class="container">
            <h1>Hello, {{"world"}}!</h1>
            <p>Choose the registration CSV file. It will automatically process after being selected. The file you selected is probably very large… be patient while it processes.</p>
            <p><input id="registrationFile" type="file" accept=".csv" onchange="angular.element(this).scope().process()"></input></p>
        </div>
    </div>

    <div class="container">
        <ol>
            <li ng-repeat="heading in registration.parsedForms[0]">{{ heading.replace('/\d+\s-\s/i', '') }}</li>
        </ol>
    </div>

    <div class="container">
        <div style="page-break-after:always;" ng-repeat="student in registration.students">
            <div class="pull-right"><strong>Grade<br>{{ student.gradeRegisteringFor }}</strong></div>
            <div class="text-center">
                <h3>Learning Gate Community School</h3>
                School Year 2014&ndash;2015
            </div>
            <div class="row">
                <div class="col-xs-6">
                    <h2>{{ student.name.last + ', ' + student.name.first }}</h2>
                </div>
                <div class="col-xs-6">
                    <h2>{{ student.studentNumber }}</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-6">
                    <label>Home Address:</label>
                    <address>
                        {{ student.addr.home.line1 }}<br>
                        {{ student.addr.home.line2 }}<br ng-if="student.addr.home.line2">
                        {{ student.addr.home.city + ', ' + student.addr.home.state + ' ' + student.addr.home.zip }}
                    </address>
                </div>
                <div class="col-xs-6">
                    <label>Mailing Address (if different):</label>
                    <address ng-show="student.addr.mailing.line1">
                        {{ student.addr.mailing.line1 }}<br>
                        {{ student.addr.mailing.line2 }}<br ng-if="student.addr.mailing.line2">
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
                    <label>Age:</label> {{ student.age }}
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <label>Name of person student lives with:</label> {{student.livesWith.first + ' ' + student.livesWith.last}}
                </div>
            </div>
            <div class="row">
                <div class="col-xs-6" ng-repeat="guardian in student.guardians" style="border:1px solid lightgray">
                    <strong>Parent/Legal Guardian:</strong> {{guardian.name.last}}, {{guardian.name.first}}<br>
                    <strong>Relation to Student:</strong> {{guardian.relationToStudent}}
                    <div class="row">
                        <div class="col-xs-4">
                            <strong>Mobile #</strong><br>
                            {{ guardian.phone.mobile | tel }}
                        </div>
                        <div class="col-xs-4">
                            <strong>Home #</strong><br>
                            {{ guardian.phone.home | tel }}
                        </div>
                        <div class="col-xs-4">
                            <strong>Work #</strong><br>
                            {{ guardian.phone.work | tel }}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <strong>Employer</strong> {{ guardian.employer.name }}<br>
                            <strong>Occupation</strong> {{ guardian.employer.occupation }}
                            <address>
                                {{ guardian.employer.addr.line1 }}<br>
                                {{ guardian.employer.addr.line2 }}<br ng-if="guardian.employer.addr.line2">
                                {{ guardian.employer.addr.city + ', ' + guardian.employer.addr.state + ' ' + guardian.employer.addr.zip }}
                            </address>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <strong>Name of School Attended Previously:</strong> {{ student.lastSchool.name }}<br>
                    <strong>County Where Previous School is Located:</strong> {{ student.lastSchool.county }}
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <h4>Person(s) to contact if parent cannot be reached</h4>
                </div>
                <div class="col-xs-4" ng-repeat="designee in student.designees">
                    {{ designee.name.last + ', ' + designee.name.first }}<br>
                    {{ designee.phone.mobile | tel }}<br>
                    {{ designee.relationToStudent }}
                </div>
            </div>
        </div>
    </div> <!-- /container -->
    <div class="container hidden-print">
        <hr>
        <footer>
            <p>&copy; Learning Gate Community School <?= date("Y") ?></p>
        </footer>
    </div>


</body>
</html>