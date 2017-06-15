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

        exResults = exResults1;

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
