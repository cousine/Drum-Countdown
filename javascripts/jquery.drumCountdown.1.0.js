(function( $ ){
  $.fn.drumCountdown = function(options) {
    
    var settings = {      
      'goal'    : '1 January 2011 00:00:00'
    }
    
    return this.each(function() {
      if( options ){
        $.extend(settings, options)
      }
      
      days = $('<div>').attr('class', 'cell single days');
      hours = $('<div>').attr('class', 'cell double hours');
      minutes = $('<div>').attr('class', 'cell double minutes');
      seconds = $('<div>').attr('class', 'cell double-small seconds');
      
      tens = $('<div>').attr('class', 'tens numbers');    
      units = $('<div>').attr('class', 'units numbers');
      
      frame = $('<div>').attr('class', 'counter-frame');    
      
      days.append(tens);
      
      hours.append(tens.clone());
      hours.append(units);
      
      minutes.append(tens.clone());
      minutes.append(units.clone());
      seconds.append(tens.clone());
      seconds.append(units.clone());
      
      frame.append(days);
      frame.append(hours);
      frame.append(minutes);
      frame.append(seconds);
      
      $(this).append(frame);
      
      var days_tens_cur_top = 0;
      var hours_tens_cur_top = 0;
      var hours_units_cur_top = 0;
      var minutes_tens_cur_top = 0;
      var minutes_units_cur_top = 0;
      var seconds_tens_cur_top = 0;
      var seconds_units_cur_top = 0;
      
      var cseconds = 0;
      var cminutes = 0;
      var chours = 0;
      var cdays = 0;
      
      var runTimer = true;
      
      var goal = Date.parse(settings['goal']);
      
      $(document).ready(function(){        
        jQuery.easing.def = "jswing";
        setup();
      });
      
      function setup(){
        
        now = new Date();
        
        var gdays = parseInt(goal.toString("dd"));
        var ghours = parseInt(goal.toString("HH"));
        var gminutes = parseInt(goal.toString("mm"));
        var gseconds = parseInt(goal.toString("ss"));
        
        cdays = gdays - parseInt(Date.today().toString("dd"));
        if(cdays < 0){
          if((goal - now) > 0) {
            cdays = 30 + cdays;            
          }
        }
        
        chours = ghours - parseInt(now.toString("HH")) - 1;
        if(chours < 0){
          chours = chours + 24;
          if(cdays < 0){
            chours = -1;
          }
        }
        
        cminutes = gminutes - parseInt(now.toString("mm")) - 1;
        if(cminutes < 0){
          cminutes = cminutes + 60;
          if(chours < 0){
            cminutes = -1;
          }
        }
                
        cseconds = gseconds - parseInt(now.toString("ss")) - 1;
        if(cseconds < 0){
          cseconds = cseconds + 60;
          if(cminutes < 0)
            cseconds = -1;
        }
        
        if(cdays < 0 && chours < 0 && cminutes < 0 && cseconds < 0){
          runTimer = false;
          setCounters(0, 0, 0, 0);
        }
        else{
          setCounters(cdays, chours, cminutes, cseconds);
        }
        
        if(runTimer){
          $(document).everyTime(1000, function(i){
            setSeconds(cseconds-1);
            
            if(cseconds == 0 && cminutes == 0 && chours == 0 && cdays == 0){
              $(document).stopTime();
            }
          });
        }
      }
      
      function setCounters(days, hours, minutes, seconds){
        setSeconds(seconds);
        setMinutes(minutes);
        setHours(hours);
        setDays(days);
      }
      
      function setSeconds(value){
        if(value > 59){
          value = 0;
          setMinutes(cminutes+1);
        }
        else if(value < 0){
          value = 59;
          setMinutes(cminutes-1);
        }
        
        setCounter(".seconds", value);
        cseconds = value;
      }
      
      function setMinutes(value){
        if(value > 59){
          value = 0;
          setHours(chours+1);
        }
        else if(value < 0){
          value = 59;
          setHours(chours-1);
        }
        
        setCounter(".minutes", value);
        cminutes = value;
      }
      
      function setHours(value){
        if(value > 23){
          value = 0;
          setDays(cdays+1);
        }
        else if(value < 0){
          value = 23;
          setDays(cdays-1);
        }
        
        setCounter(".hours", value);
        chours = value;
      }
      
      function setDays(value){
        if(value > 9){
          value = 0;
        }
        else if(value < 0){
          value = 0;
        }
        
        setCounter(".days", value);
        cdays = value;
      }
      
      function setCounter(counter, value){
        var units = value % 10;
        var tens = parseInt(value / 10);
        var counter_units_element = $(counter + " .units");
        var counter_tens_element = $(counter + " .tens");
        
        switch(counter){
          case ".seconds":
            if(seconds_tens_cur_top == 0 && seconds_units_cur_top == -1050){
              counter_tens_element.css("top", "-630px");
            }
          
            seconds_units_cur_top = units * -105;
            seconds_tens_cur_top = tens * -105;
            
            if(seconds_units_cur_top == 0){
              counter_units_element.css("top", "-1155px");
              seconds_units_cur_top = -1050;
            }
            
            units_cursor = seconds_units_cur_top;
            tens_cursor = seconds_tens_cur_top;
            break;
          case ".minutes":
            if(minutes_tens_cur_top == 0 && minutes_units_cur_top == -1050){
              counter_tens_element.css("top", "-630px");
            }
          
            minutes_units_cur_top = units * -105;
            minutes_tens_cur_top = tens * -105;
            
            if(minutes_units_cur_top == 0){
              counter_units_element.css("top", "-1155px");
              minutes_units_cur_top = -1050;
            }
            
            units_cursor = minutes_units_cur_top;
            tens_cursor = minutes_tens_cur_top;
            break;
          case ".hours":
            if(hours_tens_cur_top == 0 && hours_units_cur_top == -1050){
              counter_tens_element.css("top", "-315px");
            }
            
            hours_units_cur_top = units * -105;
            hours_tens_cur_top = tens * -105;
            
            if(hours_units_cur_top == 0){
              counter_units_element.css("top", "-1155px");
              hours_units_cur_top = -1050;
            }
            
            units_cursor = hours_units_cur_top;
            tens_cursor = hours_tens_cur_top;
            break;
          case ".days":
            days_tens_cur_top = value * -105;
            
            tens_cursor = days_tens_cur_top;
            break;
        }
          
        counter_units_element.animate(
          { top: units_cursor + "px" },
          'slow',
          'swing'
        );
        
        counter_tens_element.animate(
          { top: tens_cursor + "px" },
          'slow',
          'swing'
        );
      }
    });
  };
})( jQuery );