// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var ipc = require('electron').ipcRenderer;

ipc.on('loadProgress', function(e, percent) {
    $('#progress').width(percent.toFixed(2) + '%');
});

ipc.on('loadDone', function(e, isDone) {
    if (isDone) {
        $('#search-form').show();
        $('#progress-container').fadeOut();
    }
});

var $searchBtn = $('#search-submit');
var $searchInput = $('#search-box');
var $searchResult = $('#searchResult');
var $introHelp = $('#intro-help');
var $overlay = $('#body-overlay');

$searchBtn.on('click', function () {
    $introHelp.fadeOut();
    $overlay.show();
    ipc.send('invokeSearch', $searchInput.val());
    ipc.once('searchDone', function (event, result) {
        $overlay.fadeOut();
        $searchResult.html(JSON.stringify(result, null, 2));
    });
});

