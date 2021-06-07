const path = require('path');

exports.config = {
    profile: 'integration',
    baseUrl: 'https://openui5.hana.ondemand.com/api/',
    specs: [
        path.relative(process.cwd(), path.join(__dirname, '*', '*.spec.js'))
    ],
    reporters: {
        enabled: [
            {
                name: './reporter/screenshotReporter',
                screenshotsRoot: `./tests/results`,
                reportName: `report.html`,
            }
        ]
    },
    takeScreenshot: {
        onExpectFailure: true,
        onExpectSuccess: false,
        onAction: false
    },

    timeouts: {
        getPageTimeout: '100000',
        allScriptsTimeout: '7200000',
        defaultTimeoutInterval: '3600000'
    },

    browsers: [{
        browserName: 'chrome',
        capabilities: {
            remoteWebDriverOptions: {
                maximized: false,
                browserSize: {
                    width: 1920,
                    height: 1067
                }
            }
        }
    }]
};