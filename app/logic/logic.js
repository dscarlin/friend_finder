

    $('#submit').click((e) => {
        e.preventDefault();

        console.log("form input object: " + JSON.stringify(nameObj(), null, 2));
        $.post('/api/friends', nameObj()).done((response) => {
            displayModalWith(response);
            console.log("friends object array: " + JSON.stringify(response, null, 2));
        });
    });

let nameObj = () => {
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

let displayModalWith = (info) => {
    let photoElement = $('<img>').attr({src: info.photo, alt: 'Profile Picture N/A'});
    $('#friendName').text(info.name);
    $('#photoDisplay').append(photoElement);
    
}

