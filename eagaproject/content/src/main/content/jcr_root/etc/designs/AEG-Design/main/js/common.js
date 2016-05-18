$(document).on('ready', function () {

    $('[data-toggle="modal"]').on('click', function () {
        var dataContent = $(this).attr('data-content');
        var dataModalId = $(this).attr('data-modal-id');
        if (dataContent) {
            var modalContentId;
            if (dataModalId) {
                modalContentId = '.modal-' + dataContent + '[data-modal-id="' + dataModalId + '"]';
            } else {
                modalContentId = '.modal-' + dataContent;
            }
            var modalContentObject = $(modalContentId);

            var previousModalContent = $('.modal-fullscreen .modal-dialog .modal-content');
            var previousModalType = previousModalContent.attr('data-modal-type');
            var previousModalId = previousModalContent.attr('data-modal-id');
            if (previousModalContent.length !== 0) {
                if (previousModalId) {
                    // it is a content with an id, like videos
                    previousModalContent.appendTo('.modal-content-container-' + previousModalType
                        + '[data-modal-id="' + previousModalId + '"]');
                } else {
                    previousModalContent.appendTo('.modal-content-container-' + previousModalType);
                }
            }

            $(modalContentObject).appendTo('.modal-fullscreen .modal-dialog');
            // if this is a video overlay, play the video
            var modalContentType = modalContentObject.attr('data-modal-type');
            if (modalContentType === "video") {
                modalContentObject.find('video').get(0).play();
            }
        }
    });

});