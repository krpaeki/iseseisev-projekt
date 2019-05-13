/*jshint esversion: 6*/

let subjectCounter = 0;
let homeworkCounter = 0;
let todoContainer = [];

$(document).ready(function(){

	render();

  $('.tere').on('click', function(){
      subjectCounter ++;
      $('.container').append(
        $('<div>').addClass("subject").
        attr("id","subject" + subjectCounter).
        attr("contenteditable", "true").
        append("subject").
        on('keydown paste', function (e) {
          maxLimitForContenteditableDiv(e, 1, 40); }));

		$('.container').append(
          $('<span>').addClass("removeSubject").attr('id', "subject" + subjectCounter).text("-").on('click', function(e){
            if (e.target == this){

				let x = $(this).attr("id");

				x = x.slice(x.length-(x.length%15+1), x.length);

				//console.log(x.substr(x.indexOf('_')+1, x.length));

				$('#subject' + x).remove();
				$('#subject' + x).remove();
				$('#subject' + x).remove();

				if (x == subjectCounter) subjectCounter -= 1;
            }
		}));
        $('.container').append(
          $('<span>').addClass("addHomework").attr('id', "subject" + subjectCounter).text("+").on('click', function(e){
            if (e.target == this){
                addHomework(e, $(this).attr('id'), "homework"); // e
            }
          }));
  });

  $('.scan').on('click', function(){
	  scanAll();
  });

});

function addHomework(e, inheritedID, title){

  homeworkCounter++;

  inheritedID = inheritedID.slice(inheritedID.length-inheritedID.length%6+1, inheritedID.length);

  if (title == ""){
	  title = "homework";
  }

  $(e.target).append(
    $('<div>').addClass("homework").attr("id","homework" + inheritedID + "_" + homeworkCounter).attr("contenteditable", "true").append(title).on('keydown paste', function (e) {
      maxLimitForContenteditableDiv(e, 1, 20); }));
  removeHomework(e, inheritedID);
}

function removeHomework(e, inheritedID){

	$(e.target).append(
	$('<span>').addClass("removeHomework").attr("id","removeHomework" + inheritedID + "_" + homeworkCounter).text("-").on('click', function(e){
	if (e.target == this){
	  let x = $(this).attr("id");

	  x = x.slice(x.length-(x.length%15+1), x.length);

	  $('#homework' + x).remove();
	  $(this).remove();
	}
	}));
}

function maxLimitForContenteditableDiv(e, min, max) {

    if(e.which == 13){
      e.preventDefault();
    }

    let allowedKeys = false;
    let val = $(e.target).text();

    if (e.type === 'keydown') {
        allowedKeys = (
            e.which === 8 ||  /* BACKSPACE */
			      /*e.which === 13 || /* ENTER */
            e.which === 35 || /* END */
            e.which === 36 || /* HOME */
            e.which === 37 || /* LEFT */
            e.which === 38 || /* UP */
            e.which === 39 || /* RIGHT*/
            e.which === 40 || /* DOWN */
            e.which === 46 || /* DEL*/
            //e.ctrlKey === true && e.which === 65 || /* CTRL + A */
            e.ctrlKey === true && e.which === 88 || /* CTRL + X */
            e.ctrlKey === true && e.which === 67 || /* CTRL + C */
            e.ctrlKey === true && e.which === 86 || /* CTRL + V */
            e.ctrlKey === true && e.which === 90    /* CTRL + Z */
        );
    }

    if (e.type === 'paste') {
        setTimeout(function () {
            $(e.target).text($(e.target).text().slice(0, max));
        });
    }

    if (!allowedKeys && val.length >= max) {
        e.preventDefault();
    }
}

function scanAll(){

	//clearFile();

	let subject, homework, newElements;
	let subjectID, homeworkID, homeworkLongID;
	let counter;

	let homeworkList;
	let combined;

	$('div').each(function(index){
    counter = 0;
    homeworkList = "";
    combined = "";
    if (index > 0){
      let temp = $(this).attr('id');
      if (temp.includes('subject')){
        subject = $(this).text();
        subjectID = temp.slice(temp.length-temp.length%6+1, temp.length);

        $('div').each(function(){
          let homeworkTemp = $(this).attr('id');
          if (homeworkTemp.includes('homework')){
            homeworkID = $(this).attr('id');


            //homeworkID = homeworkID.slice(homeworkID.length-homeworkID.length%7+1, homeworkID.length);
			homeworkID = homeworkID.slice(homeworkID.length-homeworkID.length%7+1, homeworkID.length);
            homeworkLongID = homeworkID;
            homeworkID = homeworkID.substr(0,homeworkID.indexOf('_'));
            homeworkSecondID = homeworkLongID.substr(homeworkLongID.indexOf('_')+1, homeworkLongID.length);

            if(homeworkID == subjectID){
              homework = $(this).text();
              counter++;

              homeworkList += homework + "|";
            }
          }
        })

        if (homeworkList != ""){
          combined += subject + "|";
          combined += homeworkList
		  combined = combined.substring(0, combined.length-1);
        } else if (counter == 0){
          combined += subject;
        }

        //console.log(combined);
		//saveToFile(combined.substring(0, combined.length-1));

		combined = combined.split("|");
		//console.log(combined);
		todoContainer.push(combined);
      }
    }
  })

  save();
}

function save(){

	localStorage.setItem('todo', JSON.stringify(todoContainer));
	todoContainer = [];

	render();
}

function render(){
	let previousTodos = JSON.parse(localStorage.getItem('todo'));
	let hmm;

	$('.container').text("");

	if (previousTodos != null){
		for (let i = 0; i < previousTodos.length; i++){
			console.log(previousTodos[i][0] + " test");


			subjectCounter ++;
			$('.container').append(
			$('<div>').addClass("subject").
			attr("id","subject" + subjectCounter).
			attr("contenteditable", "true").
			append(previousTodos[i][0]). // "subject"
			on('keydown paste', function (e) {
			  maxLimitForContenteditableDiv(e, 1, 100); }));

			$('.container').append(
			  $('<span>').addClass("removeSubject").attr('id', "subject" + subjectCounter).text("-").on('click', function(e){
				if (e.target == this){

					let x = $(this).attr("id");

					x = x.slice(x.length-(x.length%15+1), x.length);

					//console.log(x.substr(x.indexOf('_')+1, x.length));

					console.log(x);

					$('#subject' + x).remove();
					$('#subject' + x).remove();
					$('#subject' + x).remove();

					if (x == subjectCounter) subjectCounter -= 1;
				}
			}));
			$('.container').append(
			  $('<span>').addClass("addHomework").attr('id', "subject" + subjectCounter).text("+").on('click', function(e){
				if (e.target == this){
					addHomework(e, $(this).attr('id')); // e
					//hmm = $(this).attr('id');
				}
			  }));


			if (previousTodos[i].length > 1){
				for (let y = 1; y < previousTodos[i].length; y++){
					$('#subject' + subjectCounter + '.addHomework').append(
					$('<div>').addClass("homework").attr("id","homework" + subjectCounter + "_" + homeworkCounter).attr("contenteditable", "true").append(previousTodos[i][y]).on('keydown paste', function (e) {
					  maxLimitForContenteditableDiv(e, 1, 20);
					  console.log(previousTodos[i][y]);
						if (previousTodos[i][y] = ""){
							$(this).text("homework");
						}

					  }));

					$('#subject' + subjectCounter + '.addHomework').append(
					$('<span>').addClass("removeHomework").attr("id","removeHomework" + subjectCounter + "_" + homeworkCounter).text("-").on('click', function(e){
					if (e.target == this){
					  let x = $(this).attr("id");

					  x = x.slice(x.length-(x.length%15+1), x.length);

					  $('#homework' + x).remove();
					  $(this).remove();
					}
					}));


					//console.log(hmm);
				}
			} else {
				//console.log(previousTodos[i][0] + " second");
			}
		}
	}
}

function saveToFile(info){

    $.post('server.php', {save: info}).done(function(){
      console.log('done');
    }).fail(function(){
      console.log('fail');
    }).always(function(){
      console.log('always');
    });
}

function clearFile(){

    $.post('server.php', {clear: "yes"}).done(function(){
      console.log('done');
    }).fail(function(){
      console.log('fail');
    }).always(function(){
      console.log('always');
    });
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}
