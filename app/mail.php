<?php
	// Отправка заявки с секции "наши работы"
	if ($_POST['selected-work']) {
		$data = $_POST; 
		$to = 'alutechod@gmail.com'; //кому отправить письмо
		$sitename = $_POST['siteAddres'];
		$subject = "Запрос на аналогичные откатные ворота с сайта \"$sitename\""; // тема письма
		$contactInfo = trim($data["contact-info"]);
		$message = "";
		foreach ($data as $key => $value) {
			$message = $message .' '.$key. ' = '.$value. "\r\n";
		};
		$headers = 'From: ' . $contactInfo . "\r\n" . // в поле from указывается кто отправитель.
		'Reply-To: ' . $email . "\r\n" . // в поле Reply-To хранится обратный email (можно указать тоже самое что и в поле FROM)
		'X-Mailer: PHP/' . phpversion();
		mail($to, $subject, $message, $headers);
		// echo $message;
	};

	if ($_POST['size-checbox'] || $_POST['height'] || $_POST['width']) {
		$data = $_POST; 
		$to = 'alutechod@gmail.com'; //кому отправить письмо
		$sitename = $_POST['siteAddres'];
		$subject = "Заявка с сайта \"$sitename\""; // тема письма
		$email = trim($data["email"]);
		$message = "";
		foreach ($data as $key => $value) {
			$message = $message .' '.$key. ' = '.$value. "\r\n";
		};
		$headers = 'From: ' . $email . "\r\n" . // в поле from указывается кто отправитель.
		'Reply-To: ' . $email . "\r\n" . // в поле Reply-To хранится обратный email (можно указать тоже самое что и в поле FROM)
		'X-Mailer: PHP/' . phpversion();
		mail($to, $subject, $message, $headers);
		// echo $_POST['siteAddres'];
	};

	if ($_POST['name-from-calback-popup'] || $_POST['name-from-consultation-popup']) {
		$data = $_POST; 
		$to = 'alutechod@gmail.com'; //кому отправить письмо
		$sitename = $_POST['siteAddres'];
		$subject = "Заявка с сайта \"$sitename\""; // тема письма
		$contactInfo = trim($data["contact-info"]);
		$message = "";
		foreach ($data as $key => $value) {
			$message = $message .' '.$key. ' = '.$value. "\r\n";
		};
		$headers = 'From: ' . $contactInfo . "\r\n" . // в поле from указывается кто отправитель.
		'Reply-To: ' . $email . "\r\n" . // в поле Reply-To хранится обратный email (можно указать тоже самое что и в поле FROM)
		'X-Mailer: PHP/' . phpversion();
		mail($to, $subject, $message, $headers);
		// echo $message;
	};
?>