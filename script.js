$(document).ready(function () {

    const apiKey = 'qeQmGqx4AA9SDsXie418vjjZAJJuFirS';

    // app.categoryFunction = function(result){
    //     for(let i = 0; i < 10; i++){
    //         app.category = result._embedded.event[i].classifications[0].segment;
    //         console.log(app.category);
    //         console.log("hello")
    //     }
    // }

    // app.init = () => {
    //     console.log("App has started!");
    //     app.getInfo();
    // }; //end app init

    let category;
    let country;

    let emptyCategoryArray = [];
    let emptyCountryArray = [];

    let userSelectedCountry;
    let userSelectedSegment;


    // This function will grab info from oue API based on user input
    getInfo = function (userCountry, userSegment) {
        $.ajax({
            url: `https://app.ticketmaster.com/discovery/v2/events.json?size=20&apikey=${apiKey}`,
            type: 'GET',
            dataType: 'json',
            data: {
                segmentName: `${userSegment}`,
                countryCode: `${userCountry}`
            },
            //FIXME: Ask if we can use success, or how to convert to .then 
            success: function (result) {
                console.log("Success! We have obtained information using our user's input! Our user selected " + userCountry + " as their prefered country. Our user selected " + userSegment + " as their prefered attraction type.")

                console.log(result);

                displayInfo(result);
            }
        });
    }

    displayInfo = function (data) {
        $('.eventGrid').empty();
        const eventsArray = data._embedded.events;
        console.log(eventsArray);

        let headerToAppend = `
        
           
                <h2>Your results:</h2>
                <p>You chose <span class="segmentSpan">${userSelectedSegment}</span> in <span class="countrySpan">${userSelectedCountry}</span></p>
           
        
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
                    </div>
                    <div class="buyTickets">
                        <a href="${buyTickets}">Buy Tickets</a>
                    </div>
                </div>
            `

            $('.eventGrid').append(htmlToAppend);
        })
    }

    // Create an event listener that will trigger slow scroll to first question when "start" button is clicked
    $('.start').click(function () {
        $('html,body').animate({
            scrollTop: $(".userInputCountry").offset().top
        },
            'slow');
    });

    // Submit form:
    $('.submitBtn').on('click', function (event) {
        event.preventDefault();

        // Goal: obtain user input
        // (1) Store user's answer in a variable
        // (2) Obtain "checked" radio option from each question
        // Recall: radio buttons are grouped by name - select input by name

        console.log('Submit button has been clicked!')

        userSelectedCountry = $('input[name=userInputCountry]:checked').val();
        userSelectedSegment = $('input[name=userInputSegment]:checked').val();
        let countryCode;

        console.log(userSelectedCountry);
        console.log(userSelectedSegment);

        if (userSelectedCountry === "canada") {
            countryCode = "CA";
        }
        else if (userSelectedCountry === "usa") {
            countryCode = "US";
        }
        else {
            countryCode = "MX";
        }

        console.log(countryCode);

        // getCountryInfo(countryCode);
        // getSegmentInfo(userSelectedSegment);
        getInfo(countryCode, userSelectedSegment);

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

}); //end doc ready















// Create an event listener that will trigger slow scroll to next question when each answer is clicked
// for (let i = 1; i <= 3; i++) {
//     if (i == 1) {
//         $(`.input${i}`).click(function () {
//             $('html,body').animate({
//                 scrollTop: $(`.userInputAttraction`).offset().top
//             },
//                 'slow');
//         });
//     } else {
//         $(`.input${i}`).click(function () {
//             $('html,body').animate({
//                 scrollTop: $(`.results`).offset().top
//             },
//                 'slow');
//         });
//     }
// }