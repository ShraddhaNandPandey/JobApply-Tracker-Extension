
  $(document).ready(function () {
    var delayTimer;

    // Function to fetch and display company logo
    function fetchCompanyLogo(companyName) {
     
      var apiKey = 'aexDbL5MJN5uj3+Ut+G14Q==BQMGqeRY4tNafILl';
      var apiUrl = 'https://api.api-ninjas.com/v1/logo?name=' + encodeURIComponent(companyName);

      clearTimeout(delayTimer); // Clear the previous timer

      delayTimer = setTimeout(function () {
        $.ajax({
          method: 'GET',
          url: apiUrl,
          headers: {
            'X-Api-Key': apiKey
          },
          contentType: 'application/json',
          success: function (result) {
            if (result.length > 0) {
              var logoUrl = result[0].image;
              $('#companyLogo').attr('src', logoUrl);
            } else {
              console.error('No logo found for the company: ' + companyName);
              // Set default local image URL
              var defaultLogoUrl = 'images/happy.png';
              $('#companyLogo').attr('src', defaultLogoUrl);
            }
          },
          error: function (jqXHR) {
            console.error('Error: ', jqXHR.responseText);
          }
        });
      }, 1500); // Adjust the delay time to 2000 milliseconds (2 seconds)
    }

    // Call the function to fetch and display company logo
    $('#companyName').on('input', function () {
      var companyName = $(this).val();
      fetchCompanyLogo(companyName);
    });
  });
