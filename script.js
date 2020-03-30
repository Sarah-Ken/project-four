const app = {};

app.apiKey = 'qeQmGqx4AA9SDsXie418vjjZAJJuFirS';
app.userSelectedCountry;
app.userSelectedSegment;

app.refreshFunction = function(){
    $('html,body').animate({
        scrollTop: $("header").offset().top
    },
        'slow');

    $('select').prop('selectedIndex', 0);
    $('input').prop('checked', false);
    $('.userInputSegment').css('background-image', 'none');
    $('label').css('background', 'rgba(0,0,0,0.5')
    $('label i').css('color', 'white')
    $('.start').focus();
};

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
        app.displayInfo(result);
    }).catch(function (error) {
        $('.results').css('display', 'none');
        swal('Sorry!','No results found.', 'error');
        app.refreshFunction();
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

app.init = function(){
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

    $('.inputConcerts').on('click', function () {
        $('.userInputSegment').css('background-image', 'url(./assets/concerts.jpg)');
        $('.inputConcerts').css('background-color', 'rgba(255,255,255,0.3)');
        $('.inputSports').css('background-color', 'rgba(0,0,0,0.50)');
        $('.inputArts').css('background-color', 'rgba(0,0,0,0.50)');
        $('.inputConcerts i').css('color', 'black');
        $('.inputSports i').css('color', 'white');
        $('.inputArts i').css('color', 'white');
    })
    $('.inputSports').on('click', function () {
        $('.userInputSegment').css('background-image', 'url(./assets/sports.jpg)');
        $('.inputSports').css('background-color', 'rgba(255,255,255,0.3)');
        $('.inputConcerts').css('background-color', 'rgba(0,0,0,0.50)');
        $('.inputArts').css('background-color', 'rgba(0,0,0,0.50)');
        $('.inputSports i').css('color', 'black');
        $('.inputConcerts i').css('color', 'white');
        $('.inputArts i').css('color', 'white');
       
    })
    $('.inputArts').on('click', function () {
        $('.userInputSegment').css('background-image', 'url(./assets/theatre.jpg)');
        $('.inputArts').css('background-color', 'rgba(255,255,255,0.3)');
        $('.inputSports').css('background-color', 'rgba(0,0,0,0.50)');
        $('.inputConcerts').css('background-color', 'rgba(0,0,0,0.50)');
        $('.inputArts i').css('color', 'black');
        $('.inputSports i').css('color', 'white');
        $('.inputConcerts i').css('color', 'white');
        
    })

    $('.submitBtn').on('click', function (event) {
        event.preventDefault();
    
        app.userSelectedCountry = $("select").val();
        app.userSelectedSegment = $('input[name=userInputSegment]:checked').val();
    
        if (app.userSelectedCountry === undefined || app.userSelectedSegment === undefined) {
            $('.hidden').css('display', 'block');
        }
        else{
            $('.results').css('display', 'block');
            $('.hidden').css('display', 'none');
            
            app.getInfo(app.userSelectedCountry, app.userSelectedSegment);
    
            setTimeout(() => {
                $('html,body').animate({
                    scrollTop: $(".results").offset().top
                },
                    'slow');
            }, 1000);
        } 
    });
    
    $('.refresh').click(function () {
        app.refreshFunction();
    });
}

$(document).ready(function () {
    app.init();
}); 















