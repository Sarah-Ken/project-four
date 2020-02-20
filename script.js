const app = {};

app.apiKey = 'qeQmGqx4AA9SDsXie418vjjZAJJuFirS';


app.userSelectedCountry;
app.userSelectedSegment;

app.getInfo = function (userCountry, userSegment) {
    $.ajax({
        url: `https://app.ticketmaster.com/discovery/v2/events.json?&apikey=${app.apiKey}`,
        type: 'GET',
        dataType: 'json',
        data: {
            segmentName: `${userSegment}`,
            countryCode: `${userCountry}`,
            size: 40,
        },
    }).then(function (result) {
        console.log(result);
        app.displayInfo(result);
    }).catch(function (error) {
        console.log('hello');
        alert(`Sorry - no events found!`)
    })
}

app.displayInfo = function (data) {
    $('.eventGrid').empty();
    $('.resultsHeader').empty();

    const eventsArray = data._embedded.events;

    let userSelectedCountryText = $('select option:selected').text();

    let headerToAppend = ` 
                <h2>your results</h2>
                <p>You chose <span class="segmentSpan">${app.userSelectedSegment}</span> in <span class="countrySpan">${userSelectedCountryText}!</span></p>
        `
    $('.resultsHeader').append(headerToAppend);

    eventsArray.forEach(function (item) {
        let title = item.name;
        let imageArray = item._embedded.attractions[0].images;
        let date = item.dates.start.localDate;
        let city = item._embedded.venues[0].city.name;
        let buyTickets = item.url;
        let image;

        imageArray.forEach(function (imageObject) {
            if (imageObject.width > 500 && imageObject.width < 1000) {
                return image = imageObject.url;
            }
        });

        const htmlToAppend = `
            
                <div class="eventContainer">
                    <div class="imageContainer">
                        <img src ="${image}" alt="${title}">
                    </div>
                    <div class="eventInfoContainer">
                        <h3>${title}</h3>
                        <p>${city}</p>
                        <p>${date}</p>
                        <div class="buyTickets">
                            <a href="${buyTickets}">Buy Tickets</a>
                        </div>
                    </div>
                </div>
            `
        $('.eventGrid').append(htmlToAppend);
    })
}


$('.start').click(function () {
    $('html,body').animate({
        scrollTop: $(".userInputCountry").offset().top
    },
        'slow');
});

$('select').change(function () {
    $('html,body').animate({
        scrollTop: $(".userInputSegment").offset().top
    },
        'slow');
});


$('.submitBtn').on('click', function (event) {
    event.preventDefault();

    app.userSelectedCountry = $("select").val();
    app.userSelectedSegment = $('input[name=userInputSegment]:checked').val();

    if (app.userSelectedCountry === undefined || app.userSelectedSegment === undefined) {
        $('.hidden').css('display', 'block');
    }

    else {
        $('.results').css('display', 'block');
        $('.hidden').css('display', 'none');

        console.log('Submit button has been clicked!')

        let countryCode;

        app.getInfo(app.userSelectedCountry, app.userSelectedSegment);

        setTimeout(() => {
            $('html,body').animate({
                scrollTop: $(".results").offset().top
            },
                'slow');
        }, 500);
    }

});

$('.inputConcerts').on('click', function () {
    $('.userInputSegment').css('background-image', 'url(./assets/concerts.jpg)');
})
$('.inputSports').on('click', function () {
    $('.userInputSegment').css('background-image', 'url(./assets/sports.jpg)');
})
$('.inputArts').on('click', function () {
    $('.userInputSegment').css('background-image', 'url(./assets/theatre.jpg)');
})



$(document).ready(function () {
//   TODO: ask about init and what has to be in it

}); //end doc ready















