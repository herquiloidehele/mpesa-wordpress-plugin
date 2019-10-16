<?php

if (!function_exists('curl_version')) {
    exit("Enable cURL in PHP");
}

require_once 'mpesa-api-library/interfaces/ConfigInterface.php';
require_once 'mpesa-api-library/interfaces/TransactionResponseInterface.php';
require_once 'mpesa-api-library/interfaces/TransactionInterface.php';
require_once 'mpesa-api-library/helpers/ValidationHelper.php';
require_once 'mpesa-api-library/Config.php';
require_once 'mpesa-api-library/TransactionResponse.php';
require_once 'mpesa-api-library/Transaction.php';

if($_SERVER['REQUEST_METHOD'] == 'POST'){

    $data = json_decode(file_get_contents("php://input"), TRUE);
    $numero =  $data['numero'];
    $decrypted_data =  json_decode(base64_decode($data['encrypted_data']));

    if( $numero != '' and $decrypted_data != ''){
        $config = new \abdulmueid\mpesa\Config(
            $decrypted_data->public_key,
            $decrypted_data->api_endpoint,
            $decrypted_data->api_key,
            $decrypted_data->origin,
            $decrypted_data->service_provider_code,
            $decrypted_data->initiator_identifier,
            '');

        $transation = new \abdulmueid\mpesa\Transaction($config);

        $pagamento = $transation->c2b(
            $decrypted_data->total,
            $numero,
            'T12344A',
            $decrypted_data->third_part_reference .''. time());

        echo json_encode($pagamento);
    }else{
        throw new Error('Dados nao validados', '500');
    }

    exit();
}



