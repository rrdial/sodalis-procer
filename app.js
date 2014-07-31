// http://stackoverflow.com/a/646643
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.slice(0, str.length) == str;
  };
}
if (typeof Date.prototype.calculateAge != 'function') {
    Date.prototype.calculateAge = function () {
        var ageDifMs = Date.now() - this.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
}
if (typeof Object.prototype.keySearch != 'function') {
    Object.prototype.keySearch = function (str) {
        for (var key in this)
        {
            if (key.indexOf(str) > -1)
                return this[key];
        }
    }
}

(function(){
    var app = angular.module('sodalisProcer', []);

    app.controller('RegistrationController', ['$http', '$log', '$scope', function($http, $log, $scope){
        var registration = this;
        registration.students = [];
        
        $scope.process = function()
        {
            $log.info('changed');
            $('#registrationFile').parse({
                config: {
                    header: true,
                    dynamicTyping: true,
                    /*step: function(results, parser)
                    {
                        //$log.info(results);
                        var temp = normalizeRegistrationRows(results.data);
                        for (var i = temp.length - 1; i >= 0; i--) {
                            registration.students.push(temp[i]);
                        };
                        $scope.$apply();
                    },*/
                    complete: function(results, file)
                    {
                        $log.info(results.data[0]);
                        registration.students = normalizeRegistrationRows(results.data);
                        $scope.$apply();
                    }
                },
                before: function(file, inputElem)
                {
                    $log.info('PapaParse has begun!');
                    $log.info(file);
                    // executed before parsing each file begins;
                    // what you return here controls the flow
                },
                error: function(err, file, inputElem, reason)
                {
                    $log.error(reason);
                    // executed if an error occurs while loading the file,
                    // or if before callback aborted for some reason
                },
                complete: function()
                {
                    // executed after all files are complete
                    $log.info('PapaParse has finished!');
                }
            });
        };
    }]);
})();

function normalizeRegistrationRows(data) {
    var students = [];
    var dataLength = data.length;
    for (var i = 0; i < dataLength; i++) {
        var row = data[i];
        var  guardians = []
            ,designees = [];
        guardians.push({
            name: {
                first: row.keySearch('Parent/Guardian 1 Name: First')
                ,last: row.keySearch('Parent/Guardian 1 Name: Last')
            }
            ,relationToStudent:(row.keySearch("Parent/Guardian 1 Relationship to student(s)").startsWith('Other') ? row.keySearch("Parent/Guardian 1 Relationship (If Other)") : row.keySearch("Parent/Guardian 1 Relationship to student(s)"))
            ,addr: {
                line1:row.keySearch("Parent/Guardian 1 Address (Only If Different From Child): Add1") || row.keySearch("Student 1 Home Address (Primary): Add1")
                ,line2:row.keySearch("Parent/Guardian 1 Address (Only If Different From Child): Add2") || row.keySearch("Student 1 Home Address (Primary): Add2")
                ,city:row.keySearch("Parent/Guardian 1 Address (Only If Different From Child): City") || row.keySearch("Student 1 Home Address (Primary): City")
                ,state:row.keySearch("Parent/Guardian 1 Address (Only If Different From Child): State") || row.keySearch("Student 1 Home Address (Primary): State")
                ,zip:row.keySearch("Parent/Guardian 1 Address (Only If Different From Child): Zip") || row.keySearch("Student 1 Home Address (Primary): Zip")
            }
            ,phone: {
                mobile:row.keySearch("Parent/Guardian 1 Mobile Phone")
                ,home:row.keySearch("Parent/Guardian 1 Home Phone")
                ,work:row.keySearch("Parent/Guardian 1 Work Phone")
            }
            ,email:row.keySearch("Parent/Guardian 1 Email Address")
            ,employer: {
                name:row.keySearch("Parent/Guardian 1 Employer")
                ,occupation:row.keySearch("Parent/Guardian 1 Occupation")
                ,addr: {
                    line1:row.keySearch("Parent/Guardian 1 Employer Address: Add1")
                    ,line2:row.keySearch("Parent/Guardian 1 Employer Address: Add2")
                    ,city:row.keySearch("Parent/Guardian 1 Employer Address: City")
                    ,state:row.keySearch("Parent/Guardian 1 Employer Address: State")
                    ,zip:row.keySearch("Parent/Guardian 1 Employer Address: Zip")
                }
            }
        });
        if (row.keySearch("Parent/Guardian 2 Name: First").length) {
            guardians.push({
                name: {
                    first: row.keySearch('Parent/Guardian 2 Name: First')
                    ,last: row.keySearch('Parent/Guardian 1 Name: Last')
                }
                ,relationToStudent:(row.keySearch("Parent/Guardian 2 Relationship to student(s)").startsWith('Other') ? row.keySearch("Parent/Guardian 2 Relationship (If Other)") : row.keySearch("Parent/Guardian 2 Relationship to student(s)"))
                ,addr: {
                    line1:row.keySearch("Parent/Guardian 2 Address (Only If Different From Child): Add1") || row.keySearch("Student 1 Home Address (Primary): Add1")
                    ,line2:row.keySearch("Parent/Guardian 2 Address (Only If Different From Child): Add2") || row.keySearch("Student 1 Home Address (Primary): Add2")
                    ,city:row.keySearch("Parent/Guardian 2 Address (Only If Different From Child): City") || row.keySearch("Student 1 Home Address (Primary): City")
                    ,state:row.keySearch("Parent/Guardian 2 Address (Only If Different From Child): State") || row.keySearch("Student 1 Home Address (Primary): State")
                    ,zip:row.keySearch("Parent/Guardian 2 Address (Only If Different From Child): Zip") || row.keySearch("Student 1 Home Address (Primary): Zip")
                }
                ,phone: {
                    mobile:row.keySearch("Parent/Guardian 2 Mobile Phone")
                    ,home:row.keySearch("Parent/Guardian 2 Home Phone")
                    ,work:row.keySearch("Parent/Guardian 2 Work Phone")
                }
                ,email:row.keySearch("Parent/Guardian 2 Email Address")
                ,employer: {
                    name:row.keySearch("Parent/Guardian 2 Employer")
                    ,occupation:row.keySearch("Parent/Guardian 2 Occupation")
                    ,addr: {
                        line1:row.keySearch("Parent/Guardian 2 Employer Address: Add1")
                        ,line2:row.keySearch("Parent/Guardian 2 Employer Address: Add2")
                        ,city:row.keySearch("Parent/Guardian 2 Employer Address: City")
                        ,state:row.keySearch("Parent/Guardian 2 Employer Address: State")
                        ,zip:row.keySearch("Parent/Guardian 2 Employer Address: Zip")
                    }
                }
            });
        }
        if (row.keySearch("Designee #1: First").length) {
            designees.push({
                name: {
                    first:row.keySearch("Designee #1: First")
                    ,last:row.keySearch("Designee #1: Last")
                }
                ,phone: {
                    mobile:row.keySearch("Designee #1 Phone")
                }
                ,relationToStudent:row.keySearch("Designee #1 Relationship to Child")
            })
        }
        if (row.keySearch("Designee #2: First").length) {
            designees.push({
                name: {
                    first:row.keySearch("Designee #2: First")
                    ,last:row.keySearch("Designee #2: Last")
                }
                ,phone: {
                    mobile:row.keySearch("Designee #2 Phone")
                }
                ,relationToStudent:row.keySearch("Designee #2 Relationship to Child")
            })
        }
        if (row.keySearch("Designee #3: First").length) {
            designees.push({
                name: {
                    first:row.keySearch("Designee #3: First")
                    ,last:row.keySearch("Designee #3: Last")
                }
                ,phone: {
                    mobile:row.keySearch("Designee #3 Phone")
                }
                ,relationToStudent:row.keySearch("Designee #3 Relationship to Child")
            })
        }

        students.push({ // Student number 1 on the form
            guardians: guardians
            ,designees: designees
            ,name: {
                first:row.keySearch("Student 1 Legal Name: First")
                ,last:row.keySearch("Student 1 Legal Name: Last")
            }
            ,entry: {
                number:row["Entry"]
                ,date:row["Date"]
            }
            ,addr: {
                home: {
                    line1:row.keySearch("Student 1 Home Address (Primary): Add1")
                    ,line2:row.keySearch("Student 1 Home Address (Primary): Add2")
                    ,city:row.keySearch("Student 1 Home Address (Primary): City")
                    ,state:row.keySearch("Student 1 Home Address (Primary): State")
                    ,zip:row.keySearch("Student 1 Home Address (Primary): Zip")
                }
                ,mailing: {
                    line1:row.keySearch("Student 1 Mailing Address (If Different): Add1")
                    ,line2:row.keySearch("Student 1 Mailing Address (If Different): Add2")
                    ,city:row.keySearch("Student 1 Mailing Address (If Different): City")
                    ,state:row.keySearch("Student 1 Mailing Address (If Different): State")
                    ,zip:row.keySearch("Student 1 Mailing Address (If Different): Zip")
                }
            }
            ,gradeRegisteringFor:row.keySearch("Student 1 Grade Registering For")
            ,gender:row.keySearch("Student 1 Gender")
            ,studentNumber:row.keySearch("Student 1 Hillsborough County Student Number").toString().toLowerCase() == 'unknown' ? '' : row.keySearch("Student 1 Hillsborough County Student Number")
            ,dateOfBirth:row.keySearch("Student 1 Date of Birth")
            ,age:row.keySearch("Student 1 Current Age")
            ,lastSchool: {
                name:row.keySearch("Student 1 Name of School Attended Previously")
                ,county:row.keySearch("Student 1 County Where Previous School is Located")
            }
            ,firstTimeLGCS:row.keySearch("Is 2014-15 your first year registering any student at Learning Gate Community School?")
            ,livesWith: {
                first:row.keySearch("Name of person Student 1 lives with: First")
                ,last:row.keySearch("Name of person Student 1 lives with: Last")
            }
            ,ese: {
                fiveOhFour:row.keySearch("Does Student 1 have a 504 plan")
                ,staffed:row.keySearch("Has Student 1 been staffed")
                ,primaryDiagnosis:row.keySearch("Student 1's primary diagnosis")
                ,services:row.keySearch("What services does Student 1 currently receive from the school system")
                ,otherServices:row.keySearch("please describe services being received by Student 1")
            }
            ,photoRelease: {
                granted:row.keySearch("Student 1 - Do you give permission for your child to be photographed") == 'Yes' ? true : false
                ,signature:row.keySearch("Electronic Signature for Photo/Filming Release")
                ,date:Date.parse(row.keySearch("Acceptance Date"))
            }
        });
        if (row.keySearch("Student 2 Legal Name")) {
            students.push({ // Student number 2 on the form
                guardians: guardians
                ,designees: designees
                ,name: {
                    first:row.keySearch("Student 2 Legal Name: First")
                    ,last:row.keySearch("Student 2 Legal Name: Last")
                }
                ,entry: {
                    number:row["Entry"]
                    ,date:row["Date"]
                }
                ,addr: {
                    home: {
                        line1:row.keySearch("Student 1 Home Address (Primary): Add1")
                        ,line2:row.keySearch("Student 1 Home Address (Primary): Add2")
                        ,city:row.keySearch("Student 1 Home Address (Primary): City")
                        ,state:row.keySearch("Student 1 Home Address (Primary): State")
                        ,zip:row.keySearch("Student 1 Home Address (Primary): Zip")
                    }
                    ,mailing: {
                        line1:row.keySearch("Student 1 Mailing Address (If Different): Add1")
                        ,line2:row.keySearch("Student 1 Mailing Address (If Different): Add2")
                        ,city:row.keySearch("Student 1 Mailing Address (If Different): City")
                        ,state:row.keySearch("Student 1 Mailing Address (If Different): State")
                        ,zip:row.keySearch("Student 1 Mailing Address (If Different): Zip")
                    }
                }
                ,gradeRegisteringFor:row.keySearch("Student 2 Grade Registering For")
                ,gender:row.keySearch("Student 2 Gender")
                ,studentNumber:row.keySearch("Student 2 Hillsborough County Student Number").toString().toLowerCase() == 'unknown' ? '' : row.keySearch("Student 2 Hillsborough County Student Number")
                ,dateOfBirth:row.keySearch("Student 2 Date of Birth")
                ,age:row.keySearch("Student 2 Current Age")
                ,lastSchool: {
                    name:row.keySearch("Student 2 Name of School Attended Previously")
                    ,county:row.keySearch("Student 2 County Where Previous School is Located")
                }
                ,firstTimeLGCS:row.keySearch("Is 2014-15 your first year registering any student at Learning Gate Community School?")
                ,livesWith: {
                    first:row.keySearch("Name of person Student 1 lives with: First")
                    ,last:row.keySearch("Name of person Student 1 lives with: Last")
                }
                ,ese: {
                    fiveOhFour:row.keySearch("Does Student 2 have a 504 plan")
                    ,staffed:row.keySearch("Has Student 2 been staffed")
                    ,primaryDiagnosis:row.keySearch("Student 2's primary diagnosis")
                    ,services:row.keySearch("What services does Student 2 currently receive from the school system")
                    ,otherServices:row.keySearch("please describe services being received by Student 2")
                }
                ,photoRelease: {
                    granted:row.keySearch("Student 2 - Do you give permission for your child to be photographed") == 'Yes' ? true : false
                    ,signature:row.keySearch("Electronic Signature for Photo/Filming Release")
                    ,date:Date.parse(row.keySearch("Acceptance Date"))
                }
            });
        }
        if (row.keySearch("Student 3 Legal Name")) {
            students.push({ // Student number 2 on the form
                guardians: guardians
                ,designees: designees
                ,name: {
                    first:row.keySearch("Student 3 Legal Name: First")
                    ,last:row.keySearch("Student 3 Legal Name: Last")
                }
                ,entry: {
                    number:row["Entry"]
                    ,date:row["Date"]
                }
                ,addr: {
                    home: {
                        line1:row.keySearch("Student 1 Home Address (Primary): Add1")
                        ,line2:row.keySearch("Student 1 Home Address (Primary): Add2")
                        ,city:row.keySearch("Student 1 Home Address (Primary): City")
                        ,state:row.keySearch("Student 1 Home Address (Primary): State")
                        ,zip:row.keySearch("Student 1 Home Address (Primary): Zip")
                    }
                    ,mailing: {
                        line1:row.keySearch("Student 1 Mailing Address (If Different): Add1")
                        ,line2:row.keySearch("Student 1 Mailing Address (If Different): Add2")
                        ,city:row.keySearch("Student 1 Mailing Address (If Different): City")
                        ,state:row.keySearch("Student 1 Mailing Address (If Different): State")
                        ,zip:row.keySearch("Student 1 Mailing Address (If Different): Zip")
                    }
                }
                ,gradeRegisteringFor:row.keySearch("Student 3 Grade Registering For")
                ,gender:row.keySearch("Student 3 Gender")
                ,studentNumber:row.keySearch("Student 3 Hillsborough County Student Number").toString().toLowerCase() == 'unknown' ? '' : row.keySearch("Student 3 Hillsborough County Student Number")
                ,dateOfBirth:row.keySearch("Student 3 Date of Birth")
                ,age:row.keySearch("Student 3 Current Age")
                ,lastSchool: {
                    name:row.keySearch("Student 3 Name of School Attended Previously")
                    ,county:row.keySearch("Student 3 County Where Previous School is Located")
                }
                ,firstTimeLGCS:row.keySearch("Is 2014-15 your first year registering any student at Learning Gate Community School?")
                ,livesWith: {
                    first:row.keySearch("Name of person Student 1 lives with: First")
                    ,last:row.keySearch("Name of person Student 1 lives with: Last")
                }
                ,ese: {
                    fiveOhFour:row.keySearch("Does Student 3 have a 504 plan")
                    ,staffed:row.keySearch("Has Student 3 been staffed")
                    ,primaryDiagnosis:row.keySearch("Student 3's primary diagnosis")
                    ,services:row.keySearch("What services does Student 3 currently receive from the school system")
                    ,otherServices:row.keySearch("please describe services being received by Student 3")
                }
                ,photoRelease: {
                    granted:row.keySearch("Student 3 - Do you give permission for your child to be photographed") == 'Yes' ? true : false
                    ,signature:row.keySearch("Electronic Signature for Photo/Filming Release")
                    ,date:Date.parse(row.keySearch("Acceptance Date"))
                }
            });
        }
    };
    //console.log(students);
    return students;
}

angular.module('ng').filter('tel', function () {
    return function (tel) {
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
                country = 1;
                city = value.slice(0, 3);
                number = value.slice(3);
                break;

            case 11: // +CPPP####### -> CCC (PP) ###-####
                country = value[0];
                city = value.slice(1, 4);
                number = value.slice(4);
                break;

            case 12: // +CCCPP####### -> CCC (PP) ###-####
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;

            default:
                return tel;
        }

        if (country == 1) {
            country = "";
        }

        number = number.slice(0, 3) + '-' + number.slice(3);

        return (country + " (" + city + ") " + number).trim();
    };
});
