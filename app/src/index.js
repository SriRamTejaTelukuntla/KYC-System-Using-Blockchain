// Import Web3 JS library
const Web3 = require('web3');

// Import the ABI definition of the DemoContract
const artifact = require('../../build/contracts/KycContract.json');

const contractAddress = '0x78469c63d142caC46373D714d896E20Dd46cB506';

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
    },

    getUser: async function() {
        
        var _aadhar_number = document.getElementById('inputaadharnumber').value;
        let data = await this.contractInstance.methods.getUser(_aadhar_number).call().then(console.log);
        alert('Data is ' + data);
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
    }
    
}

window.App = App;

window.addEventListener("load", function() {
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:7545"),
    );

  App.start();
});