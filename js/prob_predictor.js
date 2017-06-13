function calcMaxIdx(arr) {
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

/* Switch between Dispersal and No Dispersal */
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
        // Elements of arrays are each crime cluster profile
        //   for the given variable, from cluster 1 to cluster 7.
        var realRangers = [[0.238452737, 6.961547263], [3.435340034, 30.56465997],
                            [9, 13], [2.227050827, 6.344377745],
                            [0.343145751, 11.65685425], [13.29081805, 62.30918195],
                            [6.201731894, 16.46493477]];
        var realGrows = [0.0, 1.0, 0.6667, 0.4286, 0.5, 1, 0.6667];
        var realRoads = [[0, 20.49791602], [0.92865423, 4.00254577],
                        [0.237303632, 1.748696368], [0.824871906, 12.03684238],
                        [2.014759118, 43.53324088], [0, 7.812166447],
                        [1.018232175, 2.467101159]];
        var realTrails = [[0, 8.047110034], [0.108885442, 0.637114558],
                        [0, 0.42121], [0, 3.83386],
                        [0, 36.84968], [0.11004, 0.922758],
                        [0, 0.857824]];
        var allRanges = [realRangers, realGrows, realRoads, realTrails];

        try {

            var valueRanger = JSON.parse(document.getElementById('showRangers').value);
            var valueSeasonal = JSON.parse(document.getElementById('showSeasonals').value);
            var valueGrows = document.getElementById('showGrows').value;
            var valueRoads = JSON.parse(document.getElementById('showRoads').value);
            var valueTrails = JSON.parse(document.getElementById('showTrails').value);

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

            if (valueGrows == "yes") {
                //exResults = exResults2;

                accumPoints[0] += realGrows[0];
                accumPoints[1] += realGrows[1];
                accumPoints[2] += realGrows[2];
                accumPoints[3] += realGrows[3];
                accumPoints[4] += realGrows[4];
                accumPoints[5] += realGrows[5];
                accumPoints[6] += realGrows[6];
            } else {
                if (valueGrows == "no") {
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

            /* Test max density of roads */

            if ((valueRoads >= realRoads[0][0]) && (valueRoads <= realRoads[0][1])) {
                accumPoints[0] += 1;
            }

            if ((valueRoads >= realRoads[1][0]) && (valueRoads <= realRoads[1][1])) {
                accumPoints[1] += 1;
            }

            if ((valueRoads >= realRoads[2][0]) && (valueRoads <= realRoads[2][1])) {
                accumPoints[2] += 1;
            }

            if ((valueRoads >= realRoads[3][0]) && (valueRoads <= realRoads[3][1])) {
                accumPoints[3] += 1;
            }

            if ((valueRoads >= realRoads[4][0]) && (valueRoads <= realRoads[4][1])) {
                accumPoints[4] += 1;
            }

            if ((valueRoads >= realRoads[5][0]) && (valueRoads <= realRoads[5][1])) {
                accumPoints[5] += 1;
            }

            if ((valueRoads >= realRoads[6][0]) && (valueRoads <= realRoads[6][1])) {
                accumPoints[6] += 1;
            }

            /* Test max density of trails */

            if ((valueTrails >= realTrails[0][0]) && (valueTrails <= realTrails[0][1])) {
                accumPoints[0] += 1;
            }

            if ((valueTrails >= realTrails[1][0]) && (valueTrails <= realTrails[1][1])) {
                accumPoints[1] += 1;
            }

            if ((valueTrails >= realTrails[2][0]) && (valueTrails <= realTrails[2][1])) {
                accumPoints[2] += 1;
            }

            if ((valueTrails >= realTrails[3][0]) && (valueTrails <= realTrails[3][1])) {
                accumPoints[3] += 1;
            }

            if ((valueTrails >= realTrails[4][0]) && (valueTrails <= realTrails[4][1])) {
                accumPoints[4] += 1;
            }

            if ((valueTrails >= realTrails[5][0]) && (valueTrails <= realTrails[5][1])) {
                accumPoints[5] += 1;
            }

            if ((valueTrails >= realTrails[6][0]) && (valueTrails <= realTrails[6][1])) {
                accumPoints[6] += 1;
            }

            exResults = accumPoints;

        } catch(err) {

            debugger;
            alert('\nError in reading new metrics.\nTry entering values again.\n');
            //message.innerHTML = "Input error: " + err;
            //window.location="/";
        }

        document.getElementById('showCrime1').value = exResults[0];
        document.getElementById('showCrime2').value = exResults[1];
        document.getElementById('showCrime3').value = exResults[2];
        document.getElementById('showCrime4').value = exResults[3];
        document.getElementById('showCrime5').value = exResults[4];
        document.getElementById('showCrime6').value = exResults[5];
        document.getElementById('showCrime7').value = exResults[6];

        var maxObj = calcMaxIdx(exResults);
        var maxIdx = maxObj.maxIdx;
        var maxValue = maxObj.maxValue;

        var nameFillers = ["Crime Profile 1", "Crime Profile 2", "Crime Profile 3",
            "Crime Profile 4", "Crime Profile 5", "Crime Profile 6", "Crime Profile 7"];

        var detailFillers = ["Details of crime profile 1", "Details of crime profile 2",
            "Details of crime profile 3", "Details of crime profile 4",
            "Details of crime profile 5", "Details of crime profile 6",
            "Crime Profile 7"];

        var largeTxt = nameFillers[maxIdx];
        var largeBtn = detailFillers[maxIdx];

        checkProfile = maxIdx; 

        document.getElementById('large-input').value = largeTxt;
        document.getElementById('large-input-btn').innerHTML = largeBtn;
        document.getElementById('show-prob-row').style.display = "block";
    });


/*$showND.click(function() {
    document.getElementById('showIfND').value="Button #2";
});*/
})
