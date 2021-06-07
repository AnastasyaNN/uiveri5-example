# UIVeri5 examples

This is an example for https://openui5.org/ui5con/onair2021/

The tests go to https://openui5.hana.ondemand.com/api/ and change OpenUI5 version to 1.89.0.

## Getting started

1. Clone this repository and navigate into it
    ```
    git clone https://github.com/AnastasyaNN/uiveri5-example.git
    cd uiveri5-example
    ```
2. Install all dependencies
    ```
    npm install
    ``` 
3. Run tests
    ```
    npm run tests
    ```
    Reports are available in [report.html](tests/results/report.html).

## Description

[conf.js](tests/conf.js) is configuration file.

[exampleSpec.spec.js](tests/integration/exampleSpec.spec.js) is a spec file. 

There are the following examples:
* Get button by property `text`:
```javascript
const changeVersionButton = element(by.control({
    controlType: "sap.m.Button",
    properties: [{text: "Change Version"}]
}));
```
* Get button by binding path:
```javascript
const changeVersionButton = element(by.control({
    controlType: "sap.m.Button",
    bindingPath: {
        modelName: "appView",
        propertyPath: "/bShowVersionSwitchInHeader"
    }
}));
```
* Get button by id:
```javascript
const changeVersionButton = element(by.id("sdk---app--changeVersionButton"));
```
* getProperty() usage:
```javascript
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
```
* Get values from localStorage:
```javascript
browser.executeScript(`return window.localStorage.getItem("item");`)
    .then(itemValue => {
        // work with itemValue
    })
```
