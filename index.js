//Note: This file is provided as an aid to help you get up and running with
//Electron for desktop apps. See the readme file for more information.

'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');

// initialize elasticsearch client
var elasticsearch = require('elasticsearch');
var elasticsearchClient = new elasticsearch.Client({
    apiVersion: '1.6',
    host: 'localhost:9200',
    log: 'trace'  
});



require('crash-reporter').start();
var mainWindow = null;

app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.webContents.on('did-finish-load', function () {
        mainWindow.setTitle(app.getName());
    });
    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    mainWindow.openDevTools();
    console.log('App started successfully');
    //pingElasticsearch();
});

function pingElasticsearch() {
    console.log('Trying to ping elasticsearch...');
    client.ping({
        requestTimeout: 30000,

        // undocumented params are appended to the query string
        hello: "elasticsearch"
    }, function (error) {
        if (error) {
            console.error('elasticsearch cluster is down!');
        } else {
            console.log('All is well');
        }
    });
}