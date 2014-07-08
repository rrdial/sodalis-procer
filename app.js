// http://stackoverflow.com/a/646643
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.slice(0, str.length) == str;
  };
}

(function(){
    var app = angular.module('sodalisProcer', []);

    app.controller('RegistrationController', ['$http', '$log', function($http, $log){
        var registration = this;
        $http.get('registration.csv')
            .success(function(data){
                registration.parsedForms = CSVToArray(data);
                //registration.parsedForms.shift(); // drop the title row
                var students = [];
                for (var i = 0; i < registration.parsedForms.length; i++) {
                    var guardians = [
                        {
                            name: {
                                first:registration.parsedForms[i][84]
                                ,last:registration.parsedForms[i][85]
                            }
                            ,relationToStudent:(registration.parsedForms[i][86].startsWith('Other') ? registration.parsedForms[i][87] : registration.parsedForms[i][86])
                            ,addr: {
                                line1:registration.parsedForms[i][88]
                                ,line2:registration.parsedForms[i][89]
                                ,city:registration.parsedForms[i][90]
                                ,state:registration.parsedForms[i][91]
                                ,zip:registration.parsedForms[i][92]
                            }
                            ,phone: {
                                mobile:registration.parsedForms[i][93]
                                ,home:registration.parsedForms[i][94]
                                ,work:registration.parsedForms[i][95]
                            }
                            ,email:registration.parsedForms[i][96]
                            ,employer: {
                                name:registration.parsedForms[i][97]
                                ,occupation:registration.parsedForms[i][98]
                                ,addr: {
                                    line1:registration.parsedForms[i][99]
                                    ,line2:registration.parsedForms[i][100]
                                    ,city:registration.parsedForms[i][101]
                                    ,state:registration.parsedForms[i][102]
                                    ,zip:registration.parsedForms[i][103]
                                }
                            }
                        },
                        {
                            name: {
                                first:registration.parsedForms[i][104]
                                ,last:registration.parsedForms[i][105]
                            }
                            ,relationToStudent:(registration.parsedForms[i][106].startsWith('Other') ? registration.parsedForms[i][107] : registration.parsedForms[i][106])
                            ,addr: {
                                line1:registration.parsedForms[i][108]
                                ,line2:registration.parsedForms[i][109]
                                ,city:registration.parsedForms[i][110]
                                ,state:registration.parsedForms[i][111]
                                ,zip:registration.parsedForms[i][112]
                            }
                            ,phone: {
                                mobile:registration.parsedForms[i][113]
                                ,home:registration.parsedForms[i][114]
                                ,work:registration.parsedForms[i][115]
                            }
                            ,email:registration.parsedForms[i][116]
                            ,employer: {
                                name:registration.parsedForms[i][117]
                                ,occupation:registration.parsedForms[i][118]
                                ,addr: {
                                    line1:registration.parsedForms[i][119]
                                    ,line2:registration.parsedForms[i][120]
                                    ,city:registration.parsedForms[i][121]
                                    ,state:registration.parsedForms[i][122]
                                    ,zip:registration.parsedForms[i][123]
                                }
                            }
                        }
                    ];
                    var pickerUppers = [
                        {
                            name: {
                                first:registration.parsedForms[i][139]
                                ,last:registration.parsedForms[i][140]
                            }
                            ,phone: {
                                mobile:registration.parsedForms[i][141]
                            }
                            ,relationToStudent:registration.parsedForms[i][142]
                        }
                        ,{
                            name: {
                                first:registration.parsedForms[i][143]
                                ,last:registration.parsedForms[i][144]
                            }
                            ,phone: {
                                mobile:registration.parsedForms[i][145]
                            }
                            ,relationToStudent:registration.parsedForms[i][146]
                        }
                        ,{
                            name: {
                                first:registration.parsedForms[i][147]
                                ,last:registration.parsedForms[i][148]
                            }
                            ,phone: {
                                mobile:registration.parsedForms[i][149]
                            }
                            ,relationToStudent:registration.parsedForms[i][150]
                        }
                    ];
                    students.push({ // Student 1
                        name: {
                            first:registration.parsedForms[i][7]
                            ,last:registration.parsedForms[i][8]
                        }
                        ,addr: {
                            home: {
                                line1:registration.parsedForms[i][9]
                                ,line2:registration.parsedForms[i][10]
                                ,city:registration.parsedForms[i][11]
                                ,state:registration.parsedForms[i][12]
                                ,zip:registration.parsedForms[i][13]
                            }
                            ,mailing: {
                                line1:registration.parsedForms[i][30]
                                ,line2:registration.parsedForms[i][31]
                                ,city:registration.parsedForms[i][32]
                                ,state:registration.parsedForms[i][33]
                                ,zip:registration.parsedForms[i][34]
                            }
                        }
                        ,gradeRegisteringFor:registration.parsedForms[i][14]
                        ,gender:registration.parsedForms[i][15]
                        ,ssn:registration.parsedForms[i][16]
                        ,studentNumber:registration.parsedForms[i][17]
                        ,dateOfBirth:registration.parsedForms[i][18]
                        ,lastSchool: {
                            type:registration.parsedForms[i][20]
                            ,name:registration.parsedForms[i][21]
                            ,attendanceDates:registration.parsedForms[i][22]
                            ,addr: {
                                line1:registration.parsedForms[i][23]
                                ,line2:registration.parsedForms[i][24]
                                ,city:registration.parsedForms[i][25]
                                ,state:registration.parsedForms[i][26]
                                ,zip:registration.parsedForms[i][27]
                                ,county:registration.parsedForms[i][29]
                            }
                        }
                        ,anyHillsboroSchool:registration.parsedForms[i][28]
                        ,livesWith: {
                            first:registration.parsedForms[i][36]
                            ,last:registration.parsedForms[i][37]
                        }
                        ,birthPlace: {
                            city:registration.parsedForms[i][38]
                            ,state:registration.parsedForms[i][39]
                            ,country:registration.parsedForms[i][40]
                        }
                        ,firstTimeHillsboro:registration.parsedForms[i][41]
                        ,relocatedFrom: {
                            city:registration.parsedForms[i][42]
                            ,county:registration.parsedForms[i][43]
                            ,state:registration.parsedForms[i][44]
                            ,country:registration.parsedForms[i][45]
                        }
                        ,ese: {
                            fiveOhFour:registration.parsedForms[i][124]
                            ,staffed:registration.parsedForms[i][125]
                            ,primaryDiagnosis:registration.parsedForms[i][126]
                            ,services:registration.parsedForms[i][127]
                            ,otherServices:registration.parsedForms[i][128]
                        }
                        ,photoRelease: {
                            granted:registration.parsedForms[i][161]
                            ,signature:registration.parsedForms[i][164]
                            ,date:registration.parsedForms[i][165]
                        }
                        ,guardians: guardians
                        ,pickerUppers: pickerUppers
                    });
                    if (registration.parsedForms[i][46].length) { // Student 2
                        students.push({ // Student 2
                            name: {
                                first:registration.parsedForms[i][46]
                                ,last:registration.parsedForms[i][47]
                            }
                            ,addr: {
                                home: {
                                    line1:registration.parsedForms[i][9]
                                    ,line2:registration.parsedForms[i][10]
                                    ,city:registration.parsedForms[i][11]
                                    ,state:registration.parsedForms[i][12]
                                    ,zip:registration.parsedForms[i][13]
                                }
                                ,mailing: {
                                    line1:registration.parsedForms[i][30]
                                    ,line2:registration.parsedForms[i][31]
                                    ,city:registration.parsedForms[i][32]
                                    ,state:registration.parsedForms[i][33]
                                    ,zip:registration.parsedForms[i][34]
                                }
                            }
                            ,gradeRegisteringFor:registration.parsedForms[i][48]
                            ,gender:registration.parsedForms[i][49]
                            ,ssn:registration.parsedForms[i][50]
                            ,studentNumber:registration.parsedForms[i][51]
                            ,dateOfBirth:registration.parsedForms[i][52]
                            ,lastSchool: {
                                type:null
                                ,name:registration.parsedForms[i][54]
                                ,attendanceDates:null
                                ,addr: {
                                    line1:null
                                    ,line2:null
                                    ,city:null
                                    ,state:null
                                    ,zip:null
                                    ,county:registration.parsedForms[i][55]
                                }
                            }
                            ,anyHillsboroSchool:null
                            ,livesWith: {
                                first:registration.parsedForms[i][36] // copied from student 1
                                ,last:registration.parsedForms[i][37] // copied from student 1
                            }
                            ,birthPlace: {
                                city:registration.parsedForms[i][57]
                                ,state:registration.parsedForms[i][58]
                                ,country:registration.parsedForms[i][59]
                            }
                            ,firstTimeHillsboro:registration.parsedForms[i][60]
                            ,relocatedFrom: {
                                city:registration.parsedForms[i][61]
                                ,county:registration.parsedForms[i][62]
                                ,state:registration.parsedForms[i][63]
                                ,country:registration.parsedForms[i][64]
                            }
                            ,ese: {
                                fiveOhFour:registration.parsedForms[i][129]
                                ,staffed:registration.parsedForms[i][130]
                                ,primaryDiagnosis:registration.parsedForms[i][131]
                                ,services:registration.parsedForms[i][132]
                                ,otherServices:registration.parsedForms[i][133]
                            }
                            ,photoRelease: {
                                granted:registration.parsedForms[i][162]
                                ,signature:registration.parsedForms[i][164]
                                ,date:registration.parsedForms[i][165]
                            }
                            ,guardians: guardians
                            ,pickerUppers: pickerUppers
                        });
                    }
                    if (registration.parsedForms[i][65].length) { // Student 3
                        students.push({ // Student 3
                            name: {
                                first:registration.parsedForms[i][65]
                                ,last:registration.parsedForms[i][66]
                            }
                            ,addr: {
                                home: {
                                    line1:registration.parsedForms[i][9]
                                    ,line2:registration.parsedForms[i][10]
                                    ,city:registration.parsedForms[i][11]
                                    ,state:registration.parsedForms[i][12]
                                    ,zip:registration.parsedForms[i][13]
                                }
                                ,mailing: {
                                    line1:registration.parsedForms[i][30]
                                    ,line2:registration.parsedForms[i][31]
                                    ,city:registration.parsedForms[i][32]
                                    ,state:registration.parsedForms[i][33]
                                    ,zip:registration.parsedForms[i][34]
                                }
                            }
                            ,gradeRegisteringFor:registration.parsedForms[i][67]
                            ,gender:registration.parsedForms[i][68]
                            ,ssn:registration.parsedForms[i][69]
                            ,studentNumber:registration.parsedForms[i][70]
                            ,dateOfBirth:registration.parsedForms[i][71]
                            ,lastSchool: {
                                type:null
                                ,name:registration.parsedForms[i][73]
                                ,attendanceDates:null
                                ,addr: {
                                    line1:null
                                    ,line2:null
                                    ,city:null
                                    ,state:null
                                    ,zip:null
                                    ,county:registration.parsedForms[i][74]
                                }
                            }
                            ,anyHillsboroSchool:null
                            ,livesWith: {
                                first:registration.parsedForms[i][36] // copied from student 1
                                ,last:registration.parsedForms[i][37] // copied from student 1
                            }
                            ,birthPlace: {
                                city:registration.parsedForms[i][76]
                                ,state:registration.parsedForms[i][77]
                                ,country:registration.parsedForms[i][78]
                            }
                            ,firstTimeHillsboro:registration.parsedForms[i][79]
                            ,relocatedFrom: {
                                city:registration.parsedForms[i][80]
                                ,county:registration.parsedForms[i][81]
                                ,state:registration.parsedForms[i][82]
                                ,country:registration.parsedForms[i][83]
                            }
                            ,ese: {
                                fiveOhFour:registration.parsedForms[i][134]
                                ,staffed:registration.parsedForms[i][135]
                                ,primaryDiagnosis:registration.parsedForms[i][136]
                                ,services:registration.parsedForms[i][137]
                                ,otherServices:registration.parsedForms[i][138]
                            }
                            ,photoRelease: {
                                granted:registration.parsedForms[i][163]
                                ,signature:registration.parsedForms[i][164]
                                ,date:registration.parsedForms[i][165]
                            }
                            ,guardians: guardians
                            ,pickerUppers: pickerUppers
                        });
                    }
                };
                $log.info(students);
                registration.students = students;
            });
    }])
})();

function CSVToArray( strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );
    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];
    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){
        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );
        }
        var strMatchedValue;
        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );
        } else {
            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];
        }
        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }
    // Return the parsed data.
    return( arrData );
}
