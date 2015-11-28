// JavaScript source code
$(document).ready(function(){

    function getFile() {
        var selectedFile = document.getElementById('input').files[0];
        return selectedFile;
    }

    function generateLineGraph(data) {
        // $('.sparklineChart').sparkline(values, { type: 'line', width: '50vw' });

        var options = {
            series: {
                lines: { show: true },
                points: { show: true }
            },
            hoverable: true
        };

        var plot = $('.flotChart').plot(data, options).data("plot");
    }

    function chartIt() {
        console.log('charIt stating');

        var timeSeries = getFile();
        if (timeSeries) {

            // parse the data
            Papa.parse(timeSeries, {
                complete: function (results) {
                    console.log("Finished:", results.data);

                    generateLineGraph( [results.data] )

                }
            });

            // plot it


        } else {
            alert("Please upload CSV file.")
        }
    }


    $('#chartIt').click(function () {
        chartIt();
    });
    
});