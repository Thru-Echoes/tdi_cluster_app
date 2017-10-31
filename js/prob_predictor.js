function calcMaxIdx( arr ) {
    /* Find index of max value */

    var max, maxIdx, returnObj;

    if ( arr.length === 0 ) {
        return -1;
    }

    max = arr[0];
    maxIdx = 0;

    for ( var i = 1; i < arr.length; i++ ) {
        if ( arr[i] > max ) {
            maxIdx = i;
            max = arr[i];
        }
    }
    returnObj = {
        "maxIdx" : maxIdx,
        "maxValue" : max
    };
    return returnObj;
}

/* Scale array of values so their values total 1 (percentages) */
function arr_scaler( arr ) {

    var tmp_arr = [0, 0, 0, 0, 0, 0, 0];
    var sum_arr = 0;

    if ( arr.length === 0 ) {
        return -1;
    }

    /* Find sum of all elements in array */
    for ( var i = 0; i < arr.length; i++ ) {
        sum_arr = sum_arr + arr[i];
    }

    /* Scale original array elements from 0 - 1 */
    for ( var j = 0; j < arr.length; j++ ) {
        tmp_arr[j] = (arr[j] / sum_arr);
    }

    return tmp_arr;

}

/* Round array of values to two decimal places into percentages */
function arr_decier( arr ) {

    var tmp_arr = [0, 0, 0, 0, 0, 0, 0];

    if ( arr.length === 0 ) {
        return -1;
    }

    for ( var i = 0; i < arr.length; i++ ) {
        // tmp_arr[i] = Math.round( arr[i] * 100 ) / 100;
        tmp_arr[i] = Math.round( arr[i] * 100 );
    }

    return tmp_arr;

}

/* Predict cluster profile likelihood click event */
var $showD = $('#showPredict');

var setPredictor = $(function() {

    $('[data-toggle="tooltip"]').tooltip();

    $showD.click(function() {

        var exResults1 = [0.4, 0.0, 0.0, 0.2, 0.2, 0.0, 0.1];
        var exResults2 = [0.0, 0.4, 0.0, 0.1, 0.1, 0.3, 0.1];
        var exResults, message;

        // Accumulate points as game for new park cluster assignment
        var accumPoints = [0, 0, 0, 0, 0, 0, 0];

        // Real low and high range for variables
        // Elements of arrays are each cluster cluster profile
        //   for the given variable, from cluster 1 to cluster 7.
        var realRangers = [[0.238452737, 6.961547263], [3.435340034, 30.56465997],
                            [9, 13], [2.227050827, 6.344377745],
                            [0.343145751, 11.65685425], [13.29081805, 62.30918195],
                            [6.201731894, 16.46493477]];
        var realGrows = [0.0, 1.0, 0.6667, 0.4286, 0.5, 1, 0.6667];
        /*var realRoads = [[0, 20.49791602], [0.92865423, 4.00254577],
                        [0.237303632, 1.748696368], [0.824871906, 12.03684238],
                        [2.014759118, 43.53324088], [0, 7.812166447],
                        [1.018232175, 2.467101159]];
        var realTrails = [[0, 8.047110034], [0.108885442, 0.637114558],
                        [0, 0.42121], [0, 3.83386],
                        [0, 36.84968], [0.11004, 0.922758],
                        [0, 0.857824]];*/
        var realRoads = [[0.2, 0.6, 0.2], [0.2, 0.6, 0.2],
                        [0.33, 0.67, 0.0], [0.0, 0.86, 0.14],
                        [0.0, 0.0, 1.0], [0.2, 0.4, 0.4],
                        [0.0, 1.0, 0.0]];
        var realTrails = [[0.2, 0.4, 0.4], [0.2, 0.8, 0.0],
                        [0.33, 0.67, 0.0], [0.0, 0.71, 0.29],
                        [0.0, 0.0, 1.0], [0.2, 0.8, 0.0],
                        [0.33, 0.67, 0.0]];

        try {

            var valueRanger = JSON.parse(document.getElementById('showRangers').value);
            var valueSeasonal = JSON.parse(document.getElementById('showSeasonals').value);
            var valueGrows, valueRoads, valueTrails;

           /* if ( $('#hist-yes').is(':checked') ) {
                valueGrows = "yes";
            } else if ( $('#hist-no').is(':checked') ) {
                valueGrows = "no";
            } else {
                alert('Error in metrics - no entry for historic grows.\n Please check yes or no.');
                return true;
            }

            if ( $('#road-low').is(':checked') ) {
                valueRoads = 0;
            } else if ( $('#road-med').is(':checked') ) {
                valueRoads = 1;
            } else if ( $('#road-hi').is(':checked') ) {
                valueRoads = 2;
            } else {
                alert('Error in metrics - no entry for road density.\n Please check an option.');
                return true;
            }

            if ( $('#trail-low').is(':checked') ) {
                valueTrails = 0;
            } else if ( $('#trail-med').is(':checked') ) {
                valueTrails = 1;
            } else if ( $('#trail-hi').is(':checked') ) {
                valueTrails = 2;
            } else {
                alert('Error in metrics - no entry for trail density.\n Please check an option.');
                return true;
            }*/

            var totRangers = valueRanger + valueSeasonal;

            /* Test low and high range of total rangers */

            if ((totRangers >= realRangers[0][0]) && (totRangers <= realRangers[0][1])) {
                accumPoints[0] += 1;
            }

            if ((totRangers >= realRangers[1][0]) && (totRangers <= realRangers[1][1])) {
                accumPoints[1] += 1;
            }

            if ((totRangers >= realRangers[2][0]) && (totRangers <= realRangers[2][1])) {
                accumPoints[2] += 1;
            }

            if ((totRangers >= realRangers[3][0]) && (totRangers <= realRangers[3][1])) {
                accumPoints[3] += 1;
            }

            if ((totRangers >= realRangers[4][0]) && (totRangers <= realRangers[4][1])) {
                accumPoints[4] += 1;
            }

            if ((totRangers >= realRangers[5][0]) && (totRangers <= realRangers[5][1])) {
                accumPoints[5] += 1;
            }

            if ((totRangers >= realRangers[6][0]) && (totRangers <= realRangers[6][1])) {
                accumPoints[6] += 1;
            }

            /* Test historic grows */

            if ( valueGrows == "yes" ) {
                //exResults = exResults2;

                accumPoints[0] += realGrows[0];
                accumPoints[1] += realGrows[1];
                accumPoints[2] += realGrows[2];
                accumPoints[3] += realGrows[3];
                accumPoints[4] += realGrows[4];
                accumPoints[5] += realGrows[5];
                accumPoints[6] += realGrows[6];
            } else {
                if ( valueGrows == "no" ) {
                    //exResults = exResults1;

                    accumPoints[0] += (1 - realGrows[0]);
                    accumPoints[1] += (1 - realGrows[1]);
                    accumPoints[2] += (1 - realGrows[2]);
                    accumPoints[3] += (1 - realGrows[3]);
                    accumPoints[4] += (1 - realGrows[4]);
                    accumPoints[5] += (1 - realGrows[5]);
                    accumPoints[6] += (1 - realGrows[6]);
                } else {
                    throw "bad value for grows. Try with either 'yes' or 'no'.";
                }
            }

            /* Add ratio points for road densities */

            accumPoints[0] += realRoads[0][valueRoads];
            accumPoints[1] += realRoads[1][valueRoads];
            accumPoints[2] += realRoads[2][valueRoads];
            accumPoints[3] += realRoads[3][valueRoads];
            accumPoints[4] += realRoads[4][valueRoads];
            accumPoints[5] += realRoads[5][valueRoads];
            accumPoints[6] += realRoads[6][valueRoads];

            /* Add ratio points for trail densities */

            accumPoints[0] += realTrails[0][valueTrails];
            accumPoints[1] += realTrails[1][valueTrails];
            accumPoints[2] += realTrails[2][valueTrails];
            accumPoints[3] += realTrails[3][valueTrails];
            accumPoints[4] += realTrails[4][valueTrails];
            accumPoints[5] += realTrails[5][valueTrails];
            accumPoints[6] += realTrails[6][valueTrails];

            //exResults = accumPoints;

            var scaledPoints = arr_scaler(accumPoints);
            var decPoints = arr_decier(scaledPoints);
            exResults = decPoints;

        } catch( err ) {

            alert('\nError in reading new metrics.\nTry entering values again.\n');
            //message.innerHTML = "Input error: " + err;
            //window.location="/";
            return false;
        }

        try {
            document.getElementById('showCluster1').value = exResults[0];
            document.getElementById('showCluster2').value = exResults[1];
            document.getElementById('showCluster3').value = exResults[2];
            document.getElementById('showCluster4').value = exResults[3];
            document.getElementById('showCluster5').value = exResults[4];
            document.getElementById('showCluster6').value = exResults[5];
            document.getElementById('showCluster7').value = exResults[6];

            var maxObj = calcMaxIdx(decPoints);
            var maxIdx = maxObj.maxIdx;
            var maxValue = maxObj.maxValue;

            var nameFillers = ["Cluster Profile 1 (" + maxValue + "%)",
            "Cluster Profile 2 (" + maxValue + "%)",
            "Cluster Profile 3 (" + maxValue + "%)",
            "Cluster Profile 4 (" + maxValue + "%)",
            "Cluster Profile 5 (" + maxValue + "%)",
            "Cluster Profile 6 (" + maxValue + "%)",
            "Cluster Profile 7 (" + maxValue + "%)"];

            var detailFillers = ["<h4 style='text-align: center;'>Details of cluster profile 1</h4>", "<h4 style='text-align: center;'>Details of cluster profile 2</h4>",
            "<h4 style='text-align: center;'>Details of cluster profile 3</h4>",
            "<h4 style='text-align: center;'>Details of cluster profile 4</h4>",
            "<h4 style='text-align: center;'>Details of cluster profile 5</h4>",
            "<h4 style='text-align: center;'>Details of cluster profile 6</h4>",
            "<h4 style='text-align: center;'>Details of cluster Profile 7</h4>"];

            var largeTxt = nameFillers[maxIdx];
            var largeBtn = detailFillers[maxIdx];

            checkProfile = maxIdx;

            document.getElementById('large-input').value = largeTxt;
            document.getElementById('large-input-btn').innerHTML = largeBtn;
            document.getElementById('show-prob-row').style.display = "block";

        } catch( err )  {
            alert('\nError in calculating likelihoods.\nPlease try again.\n');
            //message.innerHTML = "Input error: " + err;
            //window.location="/";
            return false;
        }
    });
})
