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
            graph:{
                clickable: true,
                hoverable: true
            }
        };

        var plot = $('#' + containerID).plot(data, options).data("plot");
        
        return plot;
    }
    
    function generateContainerID(){
        return 'output-container-' + outputContainerIDs.length.toString();
    }
    
    function generateOutputContainer(){
        var id = generateContainerID();
        outputContainerIDs.push(id);
        
        $('<div/>', {
                id: id,
                class: 'flotChart',
            }).appendTo('#outputContainer');
    }

    function chartIt() {
        console.log('charIt stating');

        var timeSeries = getFile();
        if (timeSeries) {

            // parse the data
            Papa.parse(timeSeries, {
                complete: function (results) {
                    console.log("Finished:", results.data);

                    // plot it
                    generateOutputContainer()
                    generateLineGraph( outputContainerIDs[outputContainerIDs.length-1], [results.data] )
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