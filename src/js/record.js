//Load records from server
function loadRecords(callback) {
    $.ajax({
        url: 'http://localhost:8080/records'
    }).done(function (records) {
        console.log('Records loaded: ' + JSON.stringify(records));
        callback(records);
    })
}

//Create record in server
function createRecord(record, callback) {
    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/records',
        data: JSON.stringify(record),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (record) {
        console.log("Record created: " + JSON.stringify(record));
        callback(record);
    })
}

//Update record in server
function updateRecord(record) {
    $.ajax({
        method: 'PUT',
        url: 'http://localhost:8080/records/' + record.id,
        data: JSON.stringify(record),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (record) {
        console.log("Updated record: " + JSON.stringify(record))
    })
}

//Delete record from server
function deleteRecord(recordId) {
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:8080/records/' + recordId
    }).done(function (record) {
        console.log("Deleted record " + recordId)
    })
}

//Show record in page
function showRecord(record) {

    var checked = '';
    var style = '';

    if (record.checked) {
        checked = 'checked';
        style = 'style="text-decoration:line-through"';
    }

    $('#info').append(
        '<div id="record-' + record.id + '"><input type="checkbox" ' + checked + '><span ' + style + '>' + record.description +
        '</span> <button>Delete</button></div>')
}

$(document).ready(function () {

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
})