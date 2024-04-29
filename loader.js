// Get storage data
chrome.storage.sync.get(['MasterSwitch'], function(data) {
    elementManager(data);
})

// Remove overlay elements
function answerFix() {
    var QnsExplanationAnswer = document.querySelectorAll('.qns_explanation_answer');
    var LockDiscussions = document.querySelectorAll('.lock-discussions');
    var QuestionContent = document.querySelectorAll('.question-content');
    QnsExplanationAnswer.forEach(function(element) {
        element.classList.remove('qns_explanation_answer');
    });
    LockDiscussions.forEach(function(element) {
        element.classList.remove('lock-discussions');
    });
    QuestionContent.forEach(function(element) {
        element.classList.remove('question-content');
    });
}

function verifiedAnswerFix() {
    var loopCounter = 0;
    var ViewVerifiedAnswer = document.querySelector('.css-hldqr4');
    if (ViewVerifiedAnswer) {
        ViewVerifiedAnswer.remove();
    } else {
        if (loopCounter <= 10) {
            loopCounter += 1;
            setTimeout(verifiedAnswerFix, 1000);
        }
    }
}

function overlayFix() {
    var CSS1SignWall = document.querySelector('.css-1c77zrq');
    var CSS2SignWall = document.querySelector('.css-ujz8lb');
    if (CSS1SignWall) {
        CSS1SignWall.remove();
    }
    if (CSS2SignWall) {
        CSS2SignWall.remove();
    }
    verifiedAnswerFix();
}

function elementManager(data) {
    if (data.MasterSwitch) {
        setTimeout(answerFix, 1000);
        setTimeout(overlayFix, 2000);
    } else if (data.MasterSwitch === false) {
        location.reload();
    }
}