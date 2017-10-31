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

        debugger; 

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

            if ( $('#hist-yes').is(':checked') ) {
                valueGrows = "yes";
            } else if ( $('#hist-no').is(':checked') ) {
                valueGrows = "no";
            } else {
                alert('Error in metrics - no entry for historic grows.\n Please check yes or no.');
                return true;
            }

            /*if ( $('#road-low').is(':checked') ) {
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

            /* Test historic grows */

            if ( valueGrows == "yes" ) {
                exResults = exResults2;

                //accumPoints[0] += realGrows[0];
            } else {
                if ( valueGrows == "no" ) {
                    exResults = exResults1;
                    //accumPoints[0] += (1 - realGrows[0]);
                } else {
                    throw "bad value for grows. Try with either 'yes' or 'no'.";
                }
            }

            /* Add ratio points for road densities */

            //accumPoints[0] += realRoads[0][valueRoads];

            /* Add ratio points for trail densities */

            //accumPoints[0] += realTrails[0][valueTrails];

            //exResults = accumPoints;

            //var scaledPoints = arr_scaler(accumPoints);
            //var decPoints = arr_decier(scaledPoints);
            //exResults = decPoints;

        } catch( err ) {

            alert('\nError in reading new metrics.\nTry entering values again.\n');
            return false;
        }

        try {
            document.getElementById('showCluster1').value = exResults[0];
            var maxObj = calcMaxIdx(decPoints);
            var maxIdx = maxObj.maxIdx;
            var maxValue = maxObj.maxValue;
            var nameFillers = ["Cluster Profile 1 (" + maxValue + "%)"];
            var detailFillers = ["<h4 style='text-align: center;'>Details of cluster profile 1</h4>"];
            var largeTxt = nameFillers[maxIdx];
            var largeBtn = detailFillers[maxIdx];

            checkProfile = maxIdx;

            document.getElementById('large-input').value = largeTxt;
            document.getElementById('large-input-btn').innerHTML = largeBtn;
            document.getElementById('show-prob-row').style.display = "block";

        } catch( err )  {
            alert('\nError in calculating likelihoods.\nPlease try again.\n');
            return false;
        }
    });
})
