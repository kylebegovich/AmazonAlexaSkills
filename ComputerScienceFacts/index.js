'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = "amzn1.echo-sdk-ams.app.amzn1.ask.skill.4e853df6-c461-4993-b7ca-288fde296993";
var SKILL_NAME = 'Computer Science Facts';

/**
 * Array containing cs facts.
 */
var CS_FACTS = [
    "Computer Science is better than Electrical and Computer Engineering.",
    "Computer Science is lit.",
    "Java, while also another name for delicious programmer juice, coffee, is a programming language.",
    "Computer Science draws a lot of its algorithms and problem solving from Mathematics.",
    "The word computer, before its common denotation, referred to an individual who did computations. Not a machine.",
    "The most common virus on computers is called Windows and affects over 90 percent of user machines.",
    "The meme community participation and the popularity of computer science as a major have a concerning level of similarity.",
    "VIM has self-esteem issues, as well it should with how bad it is sometimes.",
    "Almost twice as many people can write java on the planet than can write Finnish.",
    "Kyle knows how to code, and therefore is a computer scientist, and therefore slays.",
    "Hackathons are coding marathons Computer scientists submit themselves to for some reason.",
    "A Computer Science degree can lead to a number of fields, anything from software engineer to applied mathematician.",
    "Computer Science has a lot of facts about it, and therefore makes for great hoodie materials.",
    "Recursion is when a function calls recursion is when a function calls recursion is when a function calls Stack Overflow.",
    "Computer science is often abbreviated to c s.",
    "Research mathematics relys heavily on the coding ability of computer scientists.",
    "Programming and computer science, while closely related, are not synonyms.",
    "Computer engineers and computer scientists work closely together, despite being mortal enemies.",
    "The computer scientist is much like the humble bumblebee, neither should be able to fly.",
    "The computer scientist is much like the philosopher, both ask impossible questions often.",
    "The computer scientist is much like the mathematician, both are party animals.",
    "The computer scientist is much like the university staff, neither knows what they're doing most of the time.",
    "The computer scientist is much like the meme community, but that's none of my business",
    "The computer scientist is much like the meme community, but that's where you're wrong kid oh.",
    "The computer scientist is much like java, both spend way too much time figuring everything out when a solution is simple.",
    "The computer scientist is much like python, both don't write their own work half the time.",
    "You don't have permission to access the joke about UNIX Shell",
    "The computer scientist is much like HTML, neither flowerpot can, web server link, button, click, welcome back!",
    "The computer scientist is much like assembly, both are way too careful about defining every little aspect of their work",
    "The computer scientist is much like the terminal window, neither is particularly fancy but are extremly useful"
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