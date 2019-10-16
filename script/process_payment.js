
let links = {
	order_page: '',
	application_domain: ''
};



async function initializePayment(encrypted_data, linksResponse){

    console.log(JSON.parse(linksResponse));
	links.application_domain = JSON.parse(linksResponse)['application_domain'];
	links.order_page = JSON.parse(linksResponse)['order_page'];

	let dados = JSON.parse(window.atob(encrypted_data));

	await Swal.fire({
		title: 'Confirme o número  a ser usado',
		input: 'number',
		type: 'question',
		inputValue: dados['tel'],
		allowOutsideClick: false,
		confirmButton: 'OK',
		showCancelButton: true,
		inputValidator: (numero) => {

			if (!numero.match(/^(85|84)[0-9]{7}$/)){
				return "Introduza um número válido";
			}
		}
	}).then(function(response){
		if(response['value']){
            this.processPayment(response.value, encrypted_data, links.application_domain);
            console.log(response.value);
		}else{
            console.log("canelado");
            console.log(response);
		}
	});

}


function processPayment(numero, encrypted_data) {
    this.showLoading();
	axios.defaults.headers.post['Accepts'] = 'application/json';
	axios.defaults.headers.post['Content-Type'] = 'application/json';

	axios.post(links.application_domain +'/?initialize_payment=1',
        {
            'numero': numero,
    		'encrypted_data': encrypted_data,
			headers: {
                'Content-Type': 'application/json',
				'Accepts': 'application/json'
			}
        }).then((response) => {

			if(response.status === 200){
                Swal.close();

                console.log(response);

                let responseData = JSON.parse(response.data);

				console.log(responseData);
				this.showMessageToUser(responseData);

			}else{
				console.error("show error message");
			}

		}).catch((error) => {
			Swal.close();
        	this.disableButton(false);
        	this.showErrorMessage("Ocorreu um error inesperado");
        	console.log(error);
			if(error.response){
				//the request was made and the server responsed with a status code
				console.log({errorResponse: error.response.data});
				console.log({errorStatus: error.response.status});
				console.log({errorHeaders: error.response.headers});
			}else if(error.request) {
				//The request was made, but no response was rescieved
				console.log({errorRequest: error});
			}else{
				//Something happened in setting up the request
				console.log({errorMessage: error.message});
			}
		});

}


function showMessageToUser(response){
    this.disableButton(false);
	switch (response['output_ResponseCode']) {

		case 'INS-0' : {
			this.showSucessMessage("Pagemento efectuado com Sucesso", response['output_ResponseCode'], response['output_ResponseDesc ']);
            this.disableButton(true);
		}break;

		case 'INS-5' : {
			this.showErrorMessage("Transação Cancelada pelo Cliente");
		}break;

		case 'INS-9' : {
            this.showErrorMessage("A transação levou muito tempo, Tente Novamente");
		}break;

		case 'INS-10' : {
            this.showErrorMessage("A transação já está em andameto, Aguarde um momento");
        }break;

		case 'INS-2001' : {
            this.showErrorMessage("PIN Errado, Tente Novamente");
		}break;

		case 'INS-2006' : {
            this.showErrorMessage("Não possui saldo suficiente para efectual a compra");
		}break;

		case 'INS-996' : {
            this.showErrorMessage("Conta Mpesa do cliente não está activa");
		}break;

		case 'INS-6' : {
            this.showErrorMessage("A transação falhou, tente novamente");
		}break;

		default: {
            this.showErrorMessage("Ocorreu um erro Inesperado, Tente Novamente");
		}
	}

}


function showSucessMessage(mensagem, responseCode, responseDescripton){
    Swal.fire({
        title: mensagem,
        allowOutsideClick: false,
		confirmButtonText: 'Finalizar',
        html: 'Parabens, click <strong>Finalizar</strong> para continuar',
        type: 'success',
    }).then(function () {
        this.finalizePayment(responseCode, responseDescripton );
    });
}

function showErrorMessage(mensagem){
	Swal.fire({
		title: mensagem,
		text: 'Tente Novamente, por favor',
		type: 'error',
        allowOutsideClick: false,

	});
}

/**
 * Finaliza o Pgamento
 */
function finalizePayment(code, description){

    Swal.fire({
        title: "Finalizando...",
        text: "A tua encomenda está a ser finalizada",
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        }
    });
    console.log('Processado');
    axios.post(links.application_domain + "/?payment_action", {
        code: code,
        description: description
    }).then((response) => {
        Swal.close();
        if(response.status === 200){
            window.location.href = links.order_page;
        }
    }).catch((error) => {
        Swal.close();
        console.log(error);
        this.showErrorMessage("Ocorreu algum erro ao Finalizar");
    });
}


/**
 * Show tree dots loading
 */
function showLoading(){
    Swal.fire({
        title: "Processado...",
        text: "Verifique o seu Telemove por favor",
        allowOutsideClick: false,
		onBeforeOpen: () => {
        	Swal.showLoading();
		}
    });
}

function disableButton(flag){
	document.getElementById('pay_btn').disabled = flag;
}