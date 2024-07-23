(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();
    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Team carousel
    $(".team-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: false,
        dots: false,
        loop: true,
        margin: 50,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Testimonial carousel

    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: true,
        dots: true,
        loop: true,
        margin: 0,
        nav : true,
        navText: false,
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


     // Fact Counter

     $(document).ready(function(){
        $('.counter-value').each(function(){
            $(this).prop('Counter',0).animate({
                Counter: $(this).text()
            },{
                duration: 2000,
                easing: 'easeInQuad',
                step: function (now){
                    $(this).text(Math.ceil(now));
                }
            });
        });
    });



})(jQuery);




function submitForm() {
    var form = document.getElementById('Contact');
    var formData = new FormData(form);
    var jsonData = {};
    formData.forEach((value, key) => {jsonData[key] = value});

    // Show loading indicator
    var submitButton = document.querySelector('button[type="submit"]');
    var originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = 'Sending...';
    submitButton.disabled = true;

    fetch('https://script.google.com/macros/s/AKfycbzyaHe2SKoJmdItplQhm9Sq5wUkh721_eNjTTYh7IyzpHkVBmdJzryjKmqejG1mIBJs/exec', {
        method: 'POST',
        body: JSON.stringify(jsonData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        if(data === "Success") {
            alert('Thank you! Your message has been sent. We will get back to you soon.');
            form.reset();
        } else {
            throw new Error('Unexpected response from server');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Oops! Something went wrong. Please try again later or contact us directly.');
    })
    .finally(() => {
        // Reset button state
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
    });

    return false; // Prevent form from submitting normally
}

