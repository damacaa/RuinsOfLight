let lastTimeChecked = new Date();
//let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

let records = [];
let player = { nick: "Dani" };

//Load records from server
function loadRecords() {
    $.ajax({
        method: "GET",
        url: 'http://localhost:8080/records/'
    }).done(function (records) {
        console.log('Records loaded: ' + JSON.stringify(records));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error")
    })
}

//Create record in server
function createRecord(name1, name2, score) {
    let record = {
        nombre1: name1,
        nombre2: name2,
        puntuacion: score
    };

    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/records/',
        data: JSON.stringify(record),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (recordReceived) {
        console.log("Record created: " + JSON.stringify(recordReceived));
    })
}

function joinGame() {
    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/records/join/',
        data: JSON.stringify(player),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (hasJoined) {
        //A desarrollar funcionalidad nosecuantas
        if (hasJoined) { console.log("Tomaaaa"); } else { console.log("Jopee"); }
    })
}

let result = false;
function checkPlayer() {


    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/records/check/',
        data: JSON.stringify(player),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (hasChecked) {
        console.log(hasChecked);
        result = true;
    })

    return result;
}








/*$(document).ready(function () {

    loadRecords(function (records) {
        //When records are loaded from server
        for (var i = 0; i < records.length; i++) {
            showRecord(records[i]);
        }
    });

    var input = $('#value-input')
    var info = $('#info')

    //Handle delete buttons
    info.click(function (event) {
        var elem = $(event.target);
        if (elem.is('button')) {
            var recordDiv = elem.parent();
            var recordId = recordDiv.attr('id').split('-')[1];
            recordDiv.remove()
            deleteRecord(recordId);
        }
    })

    //Handle records checkboxs
    info.change(function (event) {

        //Get page elements for record
        var checkbox = $(event.target);
        var recordDiv = checkbox.parent();
        var textSpan = recordDiv.find('span');

        //Read record info from elements
        var recordDescription = textSpan.text();
        var recordChecked = checkbox.prop('checked');
        var recordId = recordDiv.attr('id').split('-')[1];

        //Create updated record
        var updatedRecord = {
            id: recordId,
            description: recordDescription,
            checked: recordChecked
        }

        //Update record in server
        updateRecord(updatedRecord);

        //Update page when checked
        var style = recordChecked ? 'line-through' : 'none';
        textSpan.css('text-decoration', style);
    })

    //Handle add button
    $("#add-button").click(function () {

        var value = input.val();
        input.val('');

        var record = {
            description: value,
            checked: false
        }

        createRecord(record, function (recordWithId) {
            //When record with id is returned from server
            showRecord(recordWithId);
        });
    })
})*/