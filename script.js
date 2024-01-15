$(document).ready(function () {
  const apiEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

  fetch(apiEndpoint)
    .then(response => response.json())
    .then(cocktailData => {
      const cocktail = cocktailData.drinks[0];

      // Replace name.
      $('.sip-str-drink').text(cocktail.strDrink);

      // Replace image.
      const $sipStrThumb = $('img.sip-str-thumb');
      $sipStrThumb.attr('src', cocktail.strDrinkThumb);
      $sipStrThumb.on('load', function () {
        $(this).css('opacity', 1);
      });
      $sipStrThumb.attr('alt', cocktail.strDrink);
      $sipStrThumb.attr('title', cocktail.strDrink);

      // Prepare ingredients.
      const ingredientElements = [];
      for (let index = 1; index <= 15; index++) {
        const ingredientKey = `strIngredient${index}`;
        const measureKey = `strMeasure${index}`;
        const ingredientValue = cocktail[ingredientKey];
        const measureValue = cocktail[measureKey];

        if (ingredientValue && ingredientValue.trim() !== '') {
          // If ingredient is not empty, include the measurement as well.
          const ingredientText = measureValue
            ? `${ingredientValue.trim()} - ${measureValue.trim()}`
            : ingredientValue.trim();
          ingredientElements.push(`<li class="list-group-item p-1 small">${ingredientText}</li>`);
        }
      }

      let ingredientHtml = '';
      if (ingredientElements.length > 0) {
        ingredientHtml = `<ul class="list-group list-group-flush">${ingredientElements.join('')}</ul>`;
      }
      $('.sip-str-ingredients').html(ingredientHtml);

      // Replace instructions.
      $('.sip-str-instructions').text(cocktail.strInstructions);

      // Hide loader.
      $('.sip-loader').addClass('d-none').removeClass('d-flex');

      // Show details.
      $('.sip-details').removeClass('d-none');
    })
    .catch(error => {
      console.error('Error fetching data:', error);

      // Hide loader.
      $('.sip-loader').addClass('d-none').removeClass('d-flex');

      // Hide details (just in case).
      $('.sip-details').addClass('d-none');

      // Show error.
      $('.sip-details').removeClass('d-none');
    });
});
