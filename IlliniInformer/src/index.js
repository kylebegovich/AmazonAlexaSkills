/**
 * Created by Kyle on 1/22/17.
 */


'use strict';

var APP_ID = undefined; //OPTIONAL: replace with 'amzn1.echo-sdk-ams.app.[your-unique-value-here]';

var AlexaSkill = require('./AlexaSkill');
    // https = require(https);

// https://api.twitter.com/1.1/search/tweets.json?q=%40IlliniVBall


/**
 * IlliniInformer is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Informer = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Informer.prototype = Object.create(AlexaSkill.prototype);
Informer.prototype.constructor = Informer;

// Initialize list of accounts
const ACCOUNTS = [
    "IlliniMBB",
    "IlliniWBB",
    "IlliniMGym",
    "IlliniWGym",
    "IlliniMGolf",
    "IlliniWGolf",
    "IlliniMTrack",
    "IlliniWTrack",
    "IlliniVBall",
    "IlliniBaseball",
    "IlliniFootball",
    "IlliniWrestling",
    "IlliniSoccer",
    "acmuiuc",
    "TheDailyIllini"
];



// adapted from given onLaunch function
Informer.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    var speechText = "Welcome to your Illini Informer! You can request information from any sports team and " +
        "a number or R-S-O's, simply by asking for information and their name, information for all, or to list them all";

    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "For instructions on what you can say, please say help me.";
    response.ask(speechText, repromptText);
};

/**
 * override intentHandlers to map intent handling functions.
 */
Informer.prototype.intentHandlers = {

    "ListTeamsIntent": function (intent, session, response) {
        var speechOutput = "Here are all of the accounts I know, ";

        for (var i = 0; i < ACCOUNTS.length; i ++) {
            speechOutput += ACCOUNTS[i] + ", ";
        }

        response.tell(speechOutput);
    },


    "InformAllIntent": function (intent, session, response) {
        var speechOutput = "Here's the news from the entire illinois community, ";

        for (var i = 0; i < ACCOUNTS.length; i ++) {
            speechOutput += getMostRecentTweet(ACCOUNTS[i]) + ", ";
        }

        response.tell(speechOutput);
    },


    "InformOneIntent": function (intent, session, response) {
        var speechOutput = getMostRecentTweet(intent.slots.Account);

        response.ask(speechOutput, repromptOutput);
    },



    // adapted from given intent
    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye, and hail to the orange!";
        response.tell(speechOutput);
    },

    // adapted from given intent
    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye, and hail to the blue!";
        response.tell(speechOutput);
    },

    // adapted from given intent
    "AMAZON.HelpIntent": function (intent, session, response) {

        var speechText = "You can request information from any sports team and a number or R-S-O's, " +
            "simply by asking for information and their name, information for all, or to list them all";
        var speechOutput = {
            speech: speechText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };

        var repromptText = "You can say things like, inform me. Or you can say exit... Now, what can I help you with?";
        var repromptOutput = {
            speech: repromptText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };

        response.ask(speechOutput, repromptOutput);
    }


};


/**
 * Returns the name of the account along with their most recent tweet
 *
 * @param account
 * @returns {*}
 */
function getMostRecentTweet(account) {
    var stringResponse = account;

    // TODO stringResponse += <CALL TO REST api> ;

    return stringResponse;
}



exports.handler = function (event, context) {
    var index = new Informer();
    console.log("Val Of Index", index);
    index.execute(event, context);
};