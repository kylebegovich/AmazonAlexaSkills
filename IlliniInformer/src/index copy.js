/**
 Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/apache2.0/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

/**
 * This is the basic implementation of Butler Buddy (or whatever name),
 * if any major concerns arise don't feel bad waking me up -> call
 */



'use strict';

var APP_ID = undefined; //OPTIONAL: replace with 'amzn1.echo-sdk-ams.app.[your-unique-value-here]';

var AlexaSkill = require('./AlexaSkill'),
    mongoose  = require('mongoose'),
    http      = require('http');

/*
 */
console.log("Before http get.");
var alfredPuckURL = "http://alfred-the-butler.herokuapp.com/api/puck";
var req = http.get(alfredPuckURL, function(res) {
    var statusCode = res.statusCode;
    console.log("statusCode", statusCode);
    var rawData = '';
    /*res.on('data', function(chunk){
     rawData += chunk;
     console.log("chunk", chunk)
     });*/

    /* res.end('end', function(){
     try{
     var parsedData = JSON.parse(rawData);
     console.log(parsedData);
     } catch(e){
     console.log(e.message);
     console.log("res.statusCode in catch", res.statusCode)
     }
     });*/
});

//console.log("req", req);
var PuckSchema = new mongoose.Schema({
    pid: String,
    label: String
});

var Puck = mongoose.model('Puck', PuckSchema);

var hello = function (callback) {
    Puck.find({}, callback);
};


// TODO remove this hard-coded list as database references are made
var CATEGORIES = [
    "kitchen",
    "bathroom",
    "living room",
    "garage",
    "bedroom"
]

/**
 * ButlerBuddy is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Butler = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Butler.prototype = Object.create(AlexaSkill.prototype);
Butler.prototype.constructor = Butler;

// adapted from given onLaunch function
Butler.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    var speechText = "Welcome to Butler Buddy. You can ask a question like, what categories are there? " +
        "What is in the kitchen? Or, where are the spoons? ... Now, what can I help you with?";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "For instructions on what you can say, please say help me.";
    response.ask(speechText, repromptText);
};

/**
 * override intentHandlers to map intent handling functions.
 */
Butler.prototype.intentHandlers = {

    "ListKnownCategoriesIntent": function (intent, session, response) {
        var speechOutput = "The list of categories is as follows, " + getListOfCategories();
        var anythingElse = "Is there anything else I may find for you?";
        response.ask(speechOutput, anythingElse);
    },

    "ListObjectsOfCategoryIntent": function (intent, session, response) {
        var speechOutput = "No object, please ask again"; // default case
        var categorySlot = intent.slots.Category;

        // this if statement structure is just null checking
        if (categorySlot && categorySlot.value) {
            speechOutput = "The list of objects within " + categorySlot +
                " is as follows, " + getListOfObjectsInCategory(intent, session, response);
        }

        var anythingElse = "Is there anything else I may find for you?";
        response.ask(speechOutput, anythingElse);
    },

    "ReturnLocationObjectIntent": function (intent, session, response) {
        var speechOutput = "No object, please ask again"; // default case

        var objectSlot = intent.slots.Object;

        // this if statement structure is just null checking
        if (objectSlot && objectSlot.value) {
            speechOutput = getObjectLocation(intent, session, response);
        }

        var anythingElse = "Is there anything else I may find for you?";
        response.ask(speechOutput, anythingElse);
    },

    // adapted from given intent
    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye, mister wayne";
        response.tell(speechOutput);
    },

    // adapted from given intent
    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye, mister wayne.";
        response.tell(speechOutput);
    },

    // adapted from given intent
    "AMAZON.HelpIntent": function (intent, session, response) {
        var speechText = "You can ask questions about what items are within a room, where they are, or what rooms I know. Now, what can I help you with?";
        var repromptText = "You can say things like, what categories are there, or you can say exit... Now, what can I help you with?";
        var speechOutput = {
            speech: speechText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        var repromptOutput = {
            speech: repromptText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.ask(speechOutput, repromptOutput);
    }
};



/**
 * Utility functions start here
 */


/**
 * Returns the location of an object, as defined in the database
 *
 * Can be passed in with or without a category
 *
 * @param intent
 * @param session
 * @param response
 */
function getObjectLocation(intent, session, response) {
    var stringOutput = "No object, please ask again"; // default case
    var object = intent.slots.Object;

    if (object && object.value) {

        // TODO this is still fucking up somehow
        hello(function(err, data) {
            stringOutput = String(data[0].label);
        });
    }

    return stringOutput;
}


function getListOfObjectsInCategory(intent, session, response) {
    var stringOut = "";
    var category = intent.slots.Category;

    // TODO remove hard code
    var Kitchen   = mongoose.model('Kitchen', objectSchema);

    if (category && category.value) {
        Puck.find({}, function (err, items) {
            if (err) return console.error(err);
            for (var step = 0; step < items.length; step ++) {
                stringOut += items[step].name;
            }
        })

    }

    return stringOut;
}

// TODO remove hard code
function getListOfCategories() {
    var listOfCategories = "";
    for (var category in CATEGORIES) {
        listOfCategories += CATEGORIES[category] + ", ";
    }
    return listOfCategories;
}



exports.handler = function (event, context) {
    var index = new Butler();
    console.log("Val Of Index", index);
    index.execute(event, context);
};


