
app = {};

app.apiKey = 'qeQmGqx4AA9SDsXie418vjjZAJJuFirS';


app.init = () => {
    
    $.ajax({
        url: 'https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=qeQmGqx4AA9SDsXie418vjjZAJJuFirS',
        type: 'GET',
        dataType: 'json',
    }).then(function(result) {
        console.log(result);
    });

}; //end app init

$(document).ready(function () {
    app.init();
}); //end doc ready


// Create an event listener that will trigger slow scroll to first question when "start" button is clicked
$('.start').click(function () {
    $('html,body').animate({
        scrollTop: $(".userInputCountry").offset().top
    },
        'slow');
});

// Create an event listener that will trigger slow scroll to next question when each answer is clicked
for (let i = 1; i <= 3; i++) {
    if (i == 1) {
        $(`.input${i}`).click(function () {
            $('html,body').animate({
                scrollTop: $(`.userInputAttraction`).offset().top
            },
                'slow');
        });
    } else {
        $(`.input${i}`).click(function () {
            $('html,body').animate({
                scrollTop: $(`.results`).offset().top
            },
                'slow');
        });
    }
}

// Submit form:
$('.submitBtn').on('click', function (event) {
    event.preventDefault();

    // Goal: obtain user input
    // (1) Store user's answer in a variable
    // (2) Obtain "checked" radio option from each question
    // Recall: radio buttons are grouped by name - select input by name

    const userSelectedCountry = $('input[name=userInputCountry]:checked').val();
    const userSelectedAttractions = $('input[name=userInputAttraction]:checked').val();

    // Filter our array based on the user's choice:
    const userChoice = countries[userSelectedTemp];
    // The array userChoice contains all cities in cold/hot arrays depending on user's selection

    // Select appropriate suggestion from our 'countries' object
    for (let index = 0; index < userChoice.length; index++) {
        // Compare user's selected temp countries (hot/cold, userChoice) with the 'environment' AND 'cost' properties in each corresponding object 
        if (userChoice[index].environment === userSelectedEnvironment
            &&
            userChoice[index].cost === userSelectedCost) {
            resultOptions.push(userChoice[index].country);
            // This will add the name of the country to our resultsObject array if its environment property AND cost property corresponds with the user input

            resultPhotos.push(userChoice[index].url);
            // This will add the photo of the country to our resultsPhotos array if its environment property AND cost property corresponds with the user input
        }
        // Result: we have two newly formed arrays (resultOptions and resultPhotos) that contain all of the countries (and photos of) in our original array that pertain to the user's preferences
    }

    // Make our '.results' section in our HTML visible on our page
    $('.results').css('display', 'flex')

    // Trigger page to scroll down to '.results' section when submit button is clicked
    $('html,body').animate({
        scrollTop: $(".results").offset().top
    },
        'slow');

    // Print to the results section: target our HTML '.results' div        
    // Use the return value from our getRandom() to print
    const randomIndex = getRandom(resultOptions.length);
    const source = `url(${resultPhotos[randomIndex]})`;

    $('.randomCountry').html(`${resultOptions[randomIndex]}`);
    $('.results').css({
        'backgroundImage': source
    })
});