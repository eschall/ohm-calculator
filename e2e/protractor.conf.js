
var HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: 'http://localhost:3000',
    specs: ['../e2e/**/*.js'],
    onPrepare: () => {
      browser.ignoreSynchronization = true
      browser.driver.manage().window().maximize();

      jasmine.getEnv().addReporter(new HtmlReporter({
          baseDirectory: 'e2e/reports',
          screenshotsSubfolder: 'images',
          jsonsSubfolder: 'jsons',
          preserveDirectory: false,
          showSummary: true,
          docName: 'report.html',
          docTitle: 'E2E Testing Automation Report'
      }).getJasmine2Reporter());
    },
    mochaOpts: {
      enableTimeouts: false,
    },
    allScriptsTimeout: 15000,
  }