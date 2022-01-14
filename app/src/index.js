// Import Web3 JS library
const Web3 = require('web3');
// Import the ABI definition of the DemoContract
const artifact = require('../../build/contracts/KycContract.json');
const artifact2 = require('../../build/contracts/DematContract.json');

/* const contractAddress = '0x78469c63d142caC46373D714d896E20Dd46cB506'; */

//const netid = await web3.eth.net.getId()
const deployedContract = artifact.networks[5777];
const contractAddress = deployedContract.address;

const deployedContract2 = artifact2.networks[5777];
const contractAddress2 = deployedContract2.address;


const MIN_GAS = 1000000;

const App = {
    web3: null,
    contractInstance: null,
    accounts: null,

    start: async function() {
        const { web3 } = this;
        // Get the accounts
        this.accounts = await web3.eth.getAccounts();

        console.log(this.accounts);

        this.contractInstance = new web3.eth.Contract(
            artifact.abi,
            contractAddress
        );

        this.contractInstance2 = new web3.eth.Contract(
            artifact2.abi,
            contractAddress2
        );
    },

    getUser: async function() {
        
        var _aadhar_number = document.getElementById('inputaadharnumber').value;
        await this.contractInstance.methods.getUser(_aadhar_number).call().then(function(result){
            console.log(result)
            document.getElementById("full-name").innerHTML = "Full Name: " + result[0];
            document.getElementById("father-name").innerHTML =  "Father Name: " + result[1];
            document.getElementById("aadhar-number").innerHTML = "Aadhar Number: " + result[2];
            document.getElementById("phone-number").innerHTML =  "Phone Number: " + result[3];
            document.getElementById("-location").innerHTML = "Location: " + result[4];
            document.getElementById("-gender").innerHTML =  "Gender: " + result[5];
            document.getElementById("-dob").innerHTML =  "Date Of Birth: " + result[6];
            
            /*alert( 
                    "Full Name: " + result[0] + 
                    "Father Name: " + result[1] +  
                    "Aadhar Number: " + result[2] + 
                    "Phone Number: " + result[3] + 
                    "Location: " + result[4] + 
                    "Gender: " + result[5] + 
                    "Date Of Birth: " + result[6]
                );*/
        });
        
    },

    getDemat: async function() {
        
        var _aadhar_number = document.getElementById('inputaadharnumber').value;
        await this.contractInstance2.methods.getUserDetails(_aadhar_number).call().then(function(result){
            console.log(result)
            document.getElementById("full-name").innerHTML = "Full Name: " + result[0];
            document.getElementById("father-name").innerHTML =  "Father Name: " + result[1];
            document.getElementById("aadhar-number").innerHTML = "Aadhar Number: " + result[2];
            document.getElementById("phone-number").innerHTML =  "Phone Number: " + result[3];
            document.getElementById("-location").innerHTML = "Location: " + result[4];
            document.getElementById("-gender").innerHTML =  "Gender: " + result[5];
            document.getElementById("-dob").innerHTML =  "Date Of Birth: " + result[6];
            
            /*alert( 
                    "Full Name: " + result[0] + 
                    "Father Name: " + result[1] +  
                    "Aadhar Number: " + result[2] + 
                    "Phone Number: " + result[3] + 
                    "Location: " + result[4] + 
                    "Gender: " + result[5] + 
                    "Date Of Birth: " + result[6]
                );*/
        });
        
    },

    setUser: async function() {
        const _fullname = document.getElementById('_fullname').value;
        const _fathername = document.getElementById('_fathername').value;
        const _aadhar_number = document.getElementById('_aadhar_number').value;
        const _phone_number = document.getElementById('_phone_number').value;
        const _location = document.getElementById('_location').value;
        const _gender = document.getElementById('_gender').value;
        const _dob = document.getElementById('_dob').value;

        console.log(_fullname, _fathername, _aadhar_number, _phone_number, _location, _gender, _dob,);
        const gas = await this.contractInstance.methods.setUser(_fullname, _fathername, _aadhar_number, _phone_number, _location, _gender, _dob).estimateGas({
            from: this.accounts[0]
        });
        await this.contractInstance.methods.setUser(_fullname, _fathername, _aadhar_number, _phone_number, _location, _gender, _dob).send({
            from: this.accounts[0], gas: Math.max(gas, MIN_GAS)
        });
    },

    validateUser: async function() {
        
    }
    
    
}


window.App = App;

window.addEventListener("load", function() {
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:7545"),
    );

  App.start();
});