$('#submit').click((e) => {
    e.preventDefault();
    let clientInput = nameObj() 
    validate(clientInput, validateImage, validateQuestions, postInfoToServer)
});

function nameObj() {
    let name = $('#name').val();
    let photo = $('#photo').val();
    let ansArray = []
    let questions = $('.question')
    for (let i=0; i < 10; i++){
        ansArray.push(questions[i].value)
    };
    return {
        name: name,
        photo: photo,
        ansArray: ansArray
    };
}

function validate(obj, validateImage, validateQuestions, postInfoToServer) {
        if (!obj.name)
            return nameInvalid();
        else 
            return validateImage(obj, validateQuestions, postInfoToServer)
}

function nameInvalid() {
    if ($('#nameError').html() == ''){
        $(window).scrollTop(0);
        $('#nameError').append($('<p>').addClass('error').text('*Name Invalid'));
        $('#name').one('focus', () => {$('#nameError').empty()});
    }
}
    
function validateImage(obj, validateQuestions, postInfoToServer) {
    let timeout =  5000;
    let timedOut = false, timer;
    let img = new Image();
    img.src = obj.photo;
    img.onerror = img.onabort = function() {
        if (!timedOut) {
            clearTimeout(timer);
            return photoInvalid('error');
        }
    };
    img.onload = function() {
        if (!timedOut) {
            clearTimeout(timer);
            return validateQuestions(obj, postInfoToServer);
        }
    };
    timer = setTimeout(function() {
        timedOut = true;
        // reset .src to invalid URL so it stops previous
        // loading, but doesn't trigger new load
        img.src = "//!!!!/test.jpg";
        return photoInvalid('timeout');
    }, timeout); 
}

function photoInvalid(param) {
    let text;
    if(param == 'error')
        text = "Photo Invalid";
    else if (param == 'timeout')
        text = "The server timed out while validating your photo, please check the URL and try again";
    else 
        text = "Photo Already in Use"

    if ($('#photoError').html() == ''){
        $(window).scrollTop(0);
        $('#photoError').append($('<p>').addClass('error').text(text));
        $('#photo').one('focus', () => {$('#photoError').empty()});
    }
}

function validateQuestions(obj, postInfoToServer){
    console.log('photo valid');
    let error = false;
    for (let i = obj.ansArray.length - 1; i >= 0; i--) {
        let ans = obj.ansArray[i]
        if (!ans){
            showQuestionError(i+1)
            error = true
        }
    }
    if(!error){
        postInfoToServer(obj)
    };
}

function showQuestionError(number) {
    let errorId = "#questionError" + number;
    let questionId = "#question" + number;
    let $errorDiv = $(errorId);
    $(window).scrollTop($errorDiv.offset().top - 45);
    if ($errorDiv.html() == ''){
        console.log($errorDiv.offset())
        $errorDiv.append($('<p>').addClass('error').text('*Required'));
        $(questionId).one('change', () => {$($errorDiv).empty()});
    }
};

function postInfoToServer(obj) {
    $.post('/api/friends', obj).done((response) => {
        if (response){
            clearFields();
            return displayModalWith(response);
        } 
        else{
            userExists();
        }
    });
}

function clearFields(){
    $('#name').val('');
    $('#photo').val('');
    $('.question').val('');
}

function displayModalWith(info) {
    let photoElement = $('<img>').attr({src: info.photo, alt: 'Profile Picture N/A', class: 'wid100 mgtb08 brdrSld'})
    $('#friendName').empty().append($('<h2>').text('Best Friend Match:').addClass('text-center'),$('<h3>').addClass('text-center').append($('<strong>').text(info.name)));
    $('#photoDisplay').empty().attr('class','mg0').append(photoElement); 
    $('#myModal').modal('show'); 
}

function userExists(){
   photoInvalid('in use')
}
