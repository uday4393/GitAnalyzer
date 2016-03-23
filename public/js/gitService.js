$(function(){
  $('#submitURL').on('click', function(e){
    e.preventDefault();

    var requri   = $('#GitInput_form').val().split('/');
    var repouri  = 'https://api.github.com/repos/'+requri[3]+'/'+requri[4]+'/issues?per_page=100';

    requestJSON(repouri, function(json) {
      if(json.message == "Not Found" || $('#GitInput_form').val() == '') {
        $('#table').html("<h2>No data Found</h2>");
      }

      else {
        // else we have a user and we display their info
        var openissues = json.length;
        var issuesInDay = 0;
        var issues7Ddays = 0;
        var moreThan7days = 0;

        $('#item1').html(openissues);
        var currentdate = new Date();

        //for each object calculate date
        $.each(json, function(i){
        //  console.log(json[i].created_at);
          var dt = new Date(json[i].created_at);
            var t1=dt.getTime();
            var t2=currentdate.getTime();
            var days = parseInt((t2-t1)/(24*3600*1000));

            if(days <= 1){issuesInDay++;}
            if(days > 1 && days <= 7){issues7Ddays++;}
            if(days >= 7){moreThan7days++;}
        });

        $('#item2').html(issuesInDay);
        $('#item3').html(issues7Ddays);
        $('#item4').html(moreThan7days);

      } // end else statement
    }); // end requestJSON Ajax call
  }); // end click event handler

  function requestJSON(url, callback) {
    $.ajax({
      url: url,
      complete: function(xhr) {
        callback.call(null, xhr.responseJSON);
      }
    });
  }
});
