/* popmodal:
 *
 * Generates the confirmation modal
 *
 * parameters: the header of the modal
 * the content of the modal
 * the text for the label of the confirm button
 * optional text to replace the label of the cancel button
 * Side Effects: creates a modal popup with the specified data,
 * hides that modal's cancel button if none is speficied
 *
 */
var util = {
    version: '.02',
    getOptions: function() {
        return util.appFramework.$(".mymodal div.option :input").not('button');
    }
};

module.exports = {

    factory: function(context) {
        util.appFramework = context;
        return this.popModal;
    },

    popModal: function(message, onAccept, onCancel) { //this takes the message object and stuffs it into the template in the right places
        util.appFramework.$('.mymodal').modal({
            backdrop: true,
            keyboard: false,
            header: util.appFramework.$('.modal-header').html('<h3>' + message.header + '</h3>'),
            content: util.appFramework.$('.modal-message').html(message.content),
            confirm: util.appFramework.$('.btn-confirm').html(message.confirm),
            cancel: util.appFramework.$('.btn-cancel').html(message.cancel),
            option: util.appFramework.$('div.option').html(message.options)
        });
        if(message.options === '') {
            util.appFramework.$('div.option').hide();
        } else {
            util.appFramework.$('div.option').show();
        }
        util.appFramework.$('.modalAccept').off('click');
        util.appFramework.$('.modalCancel').off('click');
        util.appFramework.$('.modalAccept').on('click', function() {
            util.appFramework.$('.mymodal').modal('hide');
            var options = util.getOptions();
            if(onAccept !== undefined) {
                onAccept(options);
            }
        });
        util.appFramework.$('.modalCancel').on('click', function() {
            util.appFramework.$('.mymodal').modal('hide');
            var options = util.getOptions();
            if(onCancel !== undefined) {
                onCancel(options);
            }
        });
    }
};
