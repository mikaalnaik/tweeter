$( document ).ready(function() {
      console.log( "document loaded" )

   });

   $( window ).on( "load", function() {
       console.log( "window loaded" );
   });

   $( document ).ready(function() {
    var test = $('.counter').text()
       console.log(test);
   });


// display remaining characters on Counter and turn red if over 140
   $(document).ready(function(){
        $(".new-tweet textarea").keyup(function(){
           var input = $(this).val();
           var remainingChars = 140 - input.length
           if(remainingChars < 0){
             $(this).parents().find('.counter').css('color', 'red')
           } else{
             $(this).parents().find('.counter').css('color', 'black')
           }
           $(".counter").text(remainingChars);
       });
   });
