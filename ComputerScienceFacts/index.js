'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = "amzn1.echo-sdk-ams.app.amzn1.ask.skill.4e853df6-c461-4993-b7ca-288fde296993";
var SKILL_NAME = 'Computer Science Facts';

/**
 * Array containing cs facts.
 */
var CS_FACTS = [
    "Computer Science is lit.",
    "Java, while also another name for delicious programmer juice, coffee, is a programming language.",
    "The word computer, before its common denotation, referred to an individual who did computations. Not a machine.",
    "The most common virus on computers is called Windows and affects over 50 percent of user machines.",
    "Almost twice as many people can write java on the planet than can write Finnish.",
    "An algorithm is a precise method usable by a computer for the solution to a problem.",
    "Computer Science has a lot of facts about it, and therefore makes for great hoodie materials.",
    "Computer science was not founded solely by mathematicians. An equally important group was electrical engineers, who focused on actually building a computing machine.",
    "Research mathematics rely's heavily on the coding ability of computer scientists.",
    "Programming and computer science, while closely related, are not synonymous.",
    "Computer engineers and computer scientists work closely together, despite being mortal enemies."
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random cs fact from the cs facts list
        var factIndex = Math.floor(Math.random() * CS_FACTS.length);
        var randomFact = CS_FACTS[factIndex];

        // Create speech output
        var speechOutput = "Here's your computer science fact: " + randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say tell me a fact, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};