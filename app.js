// JavaScript source code
$(document).ready(function(){

    var outputContainerIDs = [];


    function getFile() {
        var selectedFile = document.getElementById('input').files[0];
        return selectedFile;
    }
    function clearFile(){
        document.getElementById('inputFileForm').reset();
    }

    function generateLineGraph(containerID, data) {
        
        var options = {
            series: {
                lines: { show: true },
                points: { show: true }
            },
            grid: {
				hoverable: true,
				clickable: true
			},
            colors: ["#296ad4"]
        };

        var plot = $('#' + containerID).plot(data, options).data("plot");
        
        $("<div id='tooltip'></div>").css({
			position: "absolute",
			display: "none",
			border: "1px solid #f2f2f2",
			padding: "2px",
			"background-color": "#f2f2f2",
			opacity: 0.80
		}).appendTo("body");

		$('#' + containerID).bind("plothover", function (event, pos, item) {

            if (item) {
                var x = item.datapoint[0].toFixed(2),
                    y = item.datapoint[1].toFixed(2);
    
                $("#tooltip").html('(' + x + ", " + y + ")")
                    .css({top: item.pageY+5, left: item.pageX+5})
                    .fadeIn(200);
            } else {
                $("#tooltip").hide();
            }
			
		});

		
        return plot;
    }
    
    function generateContainerID(){
        return (outputContainerIDs.length + 1).toString();
    }
    
    function generateOutputContainer(){
        var id = generateContainerID();
        var timestamp = new Date();
        outputContainerIDs.push(id);
        
        // Generate the output contianer
        $('<div/>', {
                id: 'output-container-' + id,
                class: 'panel panel-default',
                css: {
                    padding: '15px'
                },
            }).appendTo('#outputContainer');
        
        // Generate the html around the output container
        $('<div/>', {
                html: '<span>[ ' + timestamp.toISOString() + ' - Output ' + outputContainerIDs[outputContainerIDs.length-1] + ' ]</span>'
            }).appendTo('#output-container-' + outputContainerIDs[outputContainerIDs.length-1]);
       
        // Generate the plot container
        $('<div/>', {
                id: 'output-plot-' + id,
                class: 'flotChart',
            }).appendTo('#output-container-' + outputContainerIDs[outputContainerIDs.length-1]);
    }

    function chartIt() {
        console.log('chartIt stating');

        var timeSeries = getFile();
        if (timeSeries) {

            // parse the data
            Papa.parse(timeSeries, {
                complete: function (results) {
                    console.log("Finished:", results.data);

                    // plot it
                    generateOutputContainer()
                    generateLineGraph( 'output-plot-' + outputContainerIDs[outputContainerIDs.length-1], [results.data] )
                    clearFile();

                }
            });


        } else {
            alert("Please upload CSV file.")
        }
    }


    $('#chartIt').click(function () {
        chartIt();
    });
    
});