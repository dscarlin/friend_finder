    $('#submit').click((e) => {
        e.preventDefault();

        $.post('/api/friends', nameObj()).done((response) => {
            displayModalWith(response);
        });
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

function displayModalWith(info) {
    let photoElement = $('<img>').attr({src: info.photo, alt: 'Profile Picture N/A', class: 'wid100 mgtb08 brdrSld'})
        .attr({});
    $('#friendName').append($('<h2>').text('Best Friend Match:').addClass('text-center'),$('<h3>').addClass('text-center').append($('<strong>').text(info.name)));
    $('#photoDisplay').empty().attr('class','mg0').append(photoElement); 
}

