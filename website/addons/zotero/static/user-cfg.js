'use strict';

var $ = require('jquery');
var ko = require('knockout');
var $osf = require('osfHelpers');

var ZoteroAccount = function(display_name, id) {
    var self = this;
    self.display_name = display_name;
    self.id = id;
};

var ZoteroUserSettingsViewModel = function() {
    var self = this;
    self.accounts = ko.observableArray();

    self.updateAccounts = function() {
        var request = $.ajax({
            url: '/api/v1/settings/zotero/accounts/'
        });
        request.done(function(data) {
            self.accounts([]);
            ko.utils.arrayMap(data.accounts, function(acct) {
                self.accounts.push(
                    new ZoteroAccount(acct.display_name, acct.id)
                )
            })
        });
        request.fail(function() {
            console.log('fail');
        });
    };

    self.connectAccount = function() {
        window.oauth_complete = function() {
            self.updateAccounts();
        };
        window.open('/oauth/connect/zotero/');
    };

    self.disconnectAccount = function(account) {
        var request = $.ajax({
            url: '/api/v1/oauth/accounts/' + account.id + '/',
            type: 'DELETE'
        });
        request.done(function(data) {
            self.updateAccounts();
        });
    };

    self.updateAccounts();



};


////////////////
// Public API //
////////////////

function ZoteroUserSettings (selector) {
    var self = this;
    self.selector = selector;
    self.$element = $(selector);
    self.viewModel = new ZoteroUserSettingsViewModel();
    self.init();
}

ZoteroUserSettings.prototype.init = function() {
    var self = this;
    ko.applyBindings(self.viewModel, self.$element[0]);
};

//module.exports = ZoteroSettings;
new ZoteroUserSettings('#zoteroUserSettings');


/*
$(document).ready(function() {

    window.oauth_complete = function(success) {
        if(success) {
            console.log("successful auth");
        } else {
            console.log("bad auth");
        }
        console.log("Flow completed");
    }

    $('#zoteroConnect').on('click', function() {
        window.open('/oauth/connect/zotero/');
    });

    $('#githubDelKey').on('click', function() {
        bootbox.confirm({
            title: 'Remove access key?',
            message: 'Are you sure you want to remove your GitHub access key? This will ' +
                'revoke access to GitHub for all projects you have authorized ' +
                'and delete your access token from GitHub. Your OSF collaborators ' +
                'will not be able to write to GitHub repos or view private repos ' +
                'that you have authorized.',
            callback: function(result) {
                if(result) {
                    $.ajax({
                        url: '/api/v1/settings/github/oauth/',
                        type: 'DELETE',
                        success: function() {
                            window.location.reload();
                        }
                    });
                }
            }
        });
    });
});
    */