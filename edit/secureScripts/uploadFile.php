<?php
	$file = file_get_contents("php://input");
	$fileName = $_SERVER['HTTP_X_FILE_NAME'];

	$allowedExts = array("pdf", "jpg", "jpeg", "gif", "png", "mp3", "mp4", "wma", "mov", "avi", "zip");
	$extension = pathinfo($fileName, PATHINFO_EXTENSION);

	if (in_array($extension, $allowedExts)) {
		if ($_POST["uploadedFile"]["error"] > 0) {
	    	echo "Upload error :(";
	    } else {
      		$imageTitle = base_convert( strval( time() ), 10, 36 ) . "." . $extension;
      		file_put_contents("../../blog/images/" . $imageTitle, $file);
      		echo $imageTitle;
	    }
	} else {
		echo "This type of file is not allowed :(";
	}
?>