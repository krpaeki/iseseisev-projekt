<?php
  if(isset($_POST["save"]) && !empty($_POST["save"])){
    saveToFile($_POST["save"]);
  }
  if(isset($_POST["clear"]) && !empty($_POST["clear"])){
    clearFile();
  }

  function clearFile(){
	if(file_put_contents("database.txt", "")){
      echo "success";
    }
  }

  function saveToFile($stringToSave){
	//$counter = 1;
    $object = new StdClass();
	//$object->stringArray = explode(" ", $stringToSave)
	$info = explode(" ", $stringToSave);
	$object->subject = $info[0];
	//$object->text = count($info);
	if (count($info) > 0){
		for ($i = 0; $i < count($info)-1; $i++){
			$object->$i = $info[$i+1];
		}
	}

    $jsonString = json_encode($object);
    if(file_put_contents("database.txt", $jsonString, FILE_APPEND)){
      echo "success";
    }
  }
?>
