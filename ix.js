/*jshint esversion: 6*/
let subjectCounter = 0;
let homeworkCounter = 0;

$(document).ready(function(){
  subjectCounter += 1;
  $('.addSubject').on('click', function(){
    $('.container').append(
      $('<div>').addClass("subject").
      attr("id","subject" + subjectCounter).
      attr("contenteditable", "true").
      append("subject"));

      $('.container').append(
        $('<span>').addClass("addHomework").text("+").on('click', function(e){
          if (e.target == this){
              addHomework(e);
          }
        }));
      });
    });

    function addHomework(e){
      console.log(e.target);
      $(e.target).append(
        $('<div>').addClass("homework").attr("id","homework" + homeworkCounter).attr("contenteditable", "true").append("homework"));
    }
