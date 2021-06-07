describe('exampleSpec', function () {
    beforeAll(() => {
        const cookieSettingsDialog = element(by.control({
            controlType: "sap.m.Dialog",
            properties: {title: "Your Cookie Settings"}
        }));
        const acceptAllButton = cookieSettingsDialog.element(by.control({
            controlType: "sap.m.Button",
            properties: {text: "Accept All"}
        }));

        acceptAllButton.click()
    });

    /*beforeEach(() => {

    });*/

    /*afterEach(() => {

    });*/

    /*afterAll(() => {

    });*/

    it('Check Change Version Dialog opening', function () {
        // get button with property text
        /*const changeVersionButton = element(by.control({
            controlType: "sap.m.Button",
            properties: [{text: "Change Version"}]
        }));*/
        // get button by bindingPath
        const changeVersionButton = element(by.control({
            controlType: "sap.m.Button",
            bindingPath: {
                modelName: "appView",
                propertyPath: "/bShowVersionSwitchInHeader"
            }
        }));
        // get button by id
        /*const changeVersionButton = element(by.id("sdk---app--changeVersionButton"));*/
        const changeVersionDialog = element(by.control({
            controlType: "sap.m.Dialog",
            properties: {title: "Change Version"}
        }));

        changeVersionButton.click();
        expect(changeVersionDialog.isDisplayed()).toBeTruthy()
    });

    it('Check that there are versions 1.89.*', function () {
        const changeVersionDialog = element(by.control({
            controlType: "sap.m.Dialog",
            properties: {title: "Change Version"}
        }));
        const versionSearchField = changeVersionDialog.element(by.control({
            controlType: "sap.m.SearchField"
        }));
        const versionStandardListItems = changeVersionDialog.all(by.control({
            controlType: "sap.m.StandardListItem",
            id: /-versionList-/
        }));

        versionSearchField.sendKeys(`1.89\n`);
        expect(versionStandardListItems.count()).toBeGreaterThan(0);
    });

    it('Check current url after version change to 1.89.0', function () {
        /*const changeVersionDialog = element(by.control({
            controlType: "sap.m.Dialog",
            properties: {title: "Change Version"}
        }));*/
        const changeVersionDialog = element(by.control({
            controlType: "sap.m.Dialog",
            bindingPath: {
                modelName: "appView",
                propertyPath: "/bPhoneSize"
            }
        }));
        const versionStandardListItems = changeVersionDialog.all(by.control({
            controlType: "sap.m.StandardListItem",
            id: /-versionList-/
        }));

        // it isn't efficient but I want to show that we can work with lists of objects
        // and use asControl().getProperty(<property>) to do something with property value (e.g. check it)
        versionStandardListItems.then(standardListItems => {
            standardListItems.forEach(standardListItem => {
                standardListItem.asControl().getProperty("title")
                    .then(version => {
                        if (version === "1.89.0") {
                            standardListItem.click()
                        }
                    })
            })
        });

        // it's possible to click on required version easier:
        /*const versionStandardListItem = changeVersionDialog.element(by.control({
            controlType: "sap.m.StandardListItem",
            id: /-versionList-/,
            properties: {title: "1.89.0"}
        }));*/
        // the same but look for sap.m.StandardListItem in sap.m.Dialog
        /*const versionStandardListItem = element(by.control({
            controlType: "sap.m.StandardListItem",
            id: /-versionList-/,
            properties: {title: "1.89.0"},
            ancestor: {
                controlType: "sap.m.Dialog"
            }
        }));*/
        // versionStandardListItem.click();

        browser.driver.wait(function () {
            return browser.driver.findElements(by.css('.sapMITHTextContent')).then(function (elements) {
                return !!elements.length;
            });
        }, browser.getPageTimeout, 'Waiting for page reload to finish')
        // we need to load UI5 dependencies (go to https://github.com/SAP/ui5-uiveri5/blob/master/docs/usage/browser.md for more details)
            .then(() => browser.loadUI5Dependencies())
            .then(() => browser.getCurrentUrl())
            .then(currentUrl => expect(currentUrl).toBe('https://openui5.hana.ondemand.com/1.89.0/'))
    })

    // get item value from localStorage
    /*browser.executeScript(`return window.localStorage.getItem("item");`)
        .then(itemValue => {
            // work with itemValue
        })*/
});
