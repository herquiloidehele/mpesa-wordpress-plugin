# Woocommerce M-pesa Payment Gateway (Vodacom) 
This plugin allows your e-commerce to have an option of paying using M-PESA mobile money service from a WordPress website/application that has WooCommerce plugin installed.

The plugin adds an option on the checkout section for paying through M-PESA (a mobile payment platform).

## Pre-requirements
  1. Create an account on [M-pesa Developer Portal](https://developer.mpesa.vm.co.mz/);
  2. Read a little bit the oficial documentation, just in case;
  3. [Clone](https://github.com/herquiloidehele/mpesa-wordpress-plugin) or [Download](https://codeload.github.com/herquiloidehele/mpesa-wordpress-plugin/zip/master) the zipped plugin 
  
## Installation
 1. Go to Plugins -> Add New
 2. On top of the page, click “Upload Plugin” button
 3. Click  on “Choose File” button
 4. Select the ZIP file from your computer
 5. Click “Install Now” button
 6. Wait for a few seconds for WordPress to complete the installation
 7. And click "Activate" to activate the plugin
  
 ## Configuration
 1. After successfull installed and activate the plugin, go to Woocommerce > Setting > Payments tab, its supposed to appear the M-pesa payment method listed. Activate it and them click on "Manage".
 
![Image 1](https://raw.githubusercontent.com/herquiloidehele/mpesa-wordpress-plugin/master/img/image2.png)
 
  Inside the M-pesa Management page you will need to fill the information and configuration fields:  
  
  ![Image 2](https://github.com/herquiloidehele/mpesa-wordpress-plugin/blob/master/img/image1.PNG?raw=true)


#### Note: All this configuration Fields can be found in [M-pesa Developer Portal](https://developer.mpesa.vm.co.mz)


## Aspects to consider when deploying your application
  1. Make sure that the port 18352 is opened in your server.\
  1.1 If not, you must open it, because this is the port used to comunicate between this plugin and Mpesa API.\
  1.2 In case you are using a shared hosting service to host your application, you will have to contact the support and ask them to open this port.


## License
This library is release under the [MIT](https://github.com/herquiloidehele/mpesa-woocommerce-plugin/blob/master/LICENSE) License. See [LICENSE file for details](https://github.com/herquiloidehele/mpesa-woocommerce-plugin/blob/master/LICENSE).

## TODO
* Improve documentation
* Add examples and Tests
