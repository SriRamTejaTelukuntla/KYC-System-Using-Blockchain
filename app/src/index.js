// Import Web3 JS library
const Web3 = require('web3');
// Import the ABI definition of the DemoContract
const artifact = require('../../build/contracts/KycContract.json');
const artifact2 = require('../../build/contracts/DematContract.json');

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

    //getting details of user
    getUser: async function() {
        
        const _aadhar_number = document.getElementById('inputaadharnumber').value;
        if (_aadhar_number.length==0) {
            document.getElementById("exist").innerHTML = "Enter Aadhar ID!";
            document.getElementById("full-name").innerHTML =  null;
            document.getElementById("father-name").innerHTML =  null;
            document.getElementById("aadhar-number").innerHTML = null;
            document.getElementById("phone-number").innerHTML =  null;
            document.getElementById("location").innerHTML = null;
            document.getElementById("gender").innerHTML =  null;
            document.getElementById("dob").innerHTML =  null; 
        }
        else {
            const validate = await this.contractInstance.methods.validateUser(_aadhar_number).call();
       
            if (validate){
                await this.contractInstance.methods.getUser(_aadhar_number).call().then(function(result){
                    console.log(result)
                    document.getElementById("full-name").innerHTML = "Full Name: " + result[0];
                    document.getElementById("father-name").innerHTML =  "Father Name: " + result[1];
                    document.getElementById("aadhar-number").innerHTML = "Aadhar Number: " + result[2];
                    document.getElementById("phone-number").innerHTML =  "Phone Number: " + result[3];
                    document.getElementById("location").innerHTML = "Location: " + result[4];
                    document.getElementById("gender").innerHTML =  "Gender: " + result[5];
                    document.getElementById("dob").innerHTML =  "Date Of Birth: " + result[6];
                    document.getElementById("exist").innerHTML = null;
                });  
            }
            else{
                document.getElementById("exist").innerHTML = "Aadhar ID Does Not Exists!";
                document.getElementById("full-name").innerHTML =  null;
                document.getElementById("father-name").innerHTML =  null;
                document.getElementById("aadhar-number").innerHTML = null;
                document.getElementById("phone-number").innerHTML =  null;
                document.getElementById("location").innerHTML = null;
                document.getElementById("gender").innerHTML =  null;
                document.getElementById("dob").innerHTML =  null; 
            }   
        } 
    },

    //getting details of user at demat end
    getDemat: async function() {
        
        const _aadhar_number = document.getElementById('inputaadharnumber1').value;
        if (_aadhar_number.length==0) {
            document.getElementById("exist").innerHTML = "Enter Aadhar ID!";
            document.getElementById("full-name").innerHTML =  null;
            document.getElementById("father-name").innerHTML =  null;
            document.getElementById("aadhar-number").innerHTML = null;
            document.getElementById("phone-number").innerHTML =  null;
            document.getElementById("location").innerHTML = null;
            document.getElementById("gender").innerHTML =  null;
            document.getElementById("dob").innerHTML =  null;  
        }
        else {
            const validate = await this.contractInstance2.methods.validateUser(_aadhar_number).call();
       
            if (validate){
                await this.contractInstance2.methods.getUserDetails(_aadhar_number).call().then(function(result){
                    console.log(result)
                    document.getElementById("full-name").innerHTML = "Full Name: " + result[0];
                    document.getElementById("father-name").innerHTML =  "Father Name: " + result[1];
                    document.getElementById("aadhar-number").innerHTML = "Aadhar Number: " + result[2];
                    document.getElementById("phone-number").innerHTML =  "Phone Number: " + result[3];
                    document.getElementById("location").innerHTML = "Location: " + result[4];
                    document.getElementById("gender").innerHTML =  "Gender: " + result[5];
                    document.getElementById("dob").innerHTML =  "Date Of Birth: " + result[6];
                    document.getElementById("exist").innerHTML = null;
                });  
            }
            else{
                document.getElementById("exist").innerHTML = "Aadhar ID does not exists!";
                document.getElementById("full-name").innerHTML =  null;
                document.getElementById("father-name").innerHTML =  null;
                document.getElementById("aadhar-number").innerHTML = null;
                document.getElementById("phone-number").innerHTML =  null;
                document.getElementById("location").innerHTML = null;
                document.getElementById("gender").innerHTML =  null;
                document.getElementById("dob").innerHTML =  null; 
            }   
        } 
    },

    //setting details of user 
    setUser: async function() {
        const _fullname = document.getElementById('userFullName').value;
        const _fathername = document.getElementById('userFatherName').value;
        const _aadhar_number = document.getElementById('userAadharNumber').value;
        const _phone_number = document.getElementById('userPhoneNumber').value;
        const _location = document.getElementById('userLocation').value;
        const _gender = document.getElementById('userGender').value;
        const _dob = document.getElementById('userDOB').value;

        let valuesCheck = false;
            if (_fullname == "")
                document.getElementById("inputValuesCheck").innerHTML = "Enter your Full Name!";
            else if (_fathername == "")
                document.getElementById("inputValuesCheck").innerHTML = "Enter your Father Name!";
            else if (_aadhar_number == "")
                document.getElementById("inputValuesCheck").innerHTML = "Enter your Aadhar Number!";
            else if (_phone_number.length == 0)
                document.getElementById("inputValuesCheck").innerHTML = "Enter your Phone Number!";
            else if (_phone_number.length != 10)
                document.getElementById("inputValuesCheck").innerHTML = "Enter your 10 digit Phone Number!";
            else if (_location == "")
                document.getElementById("inputValuesCheck").innerHTML = "Enter your Location!";
            else if (_gender == "")
                document.getElementById("inputValuesCheck").innerHTML = "Enter your Gender!";
            else if (_dob == "")
                document.getElementById("inputValuesCheck").innerHTML = "Enter your Date of Birth!";
            else
                valuesCheck = true;
        
        if (valuesCheck){
            const validate = await this.contractInstance.methods.validateUser(_aadhar_number).call();

            if (!validate){
                console.log(_fullname, _fathername, _aadhar_number, _phone_number, _location, _gender, _dob,);
                const gas = await this.contractInstance.methods.setUser(_fullname, _fathername, _aadhar_number, _phone_number, _location, _gender, _dob).estimateGas({
                    from: this.accounts[0]
                });
                await this.contractInstance.methods.setUser(_fullname, _fathername, _aadhar_number, _phone_number, _location, _gender, _dob).send({
                    from: this.accounts[0], gas: Math.max(gas, MIN_GAS)
                });
                document.getElementById("userConfirmationCheck").innerHTML = "Success!";
                document.getElementById("userValidateCheck").innerHTML = null;
                document.getElementById("inputValuesCheck").innerHTML = null;
            }
            else{
                document.getElementById("userConfirmationCheck").innerHTML = null;
                document.getElementById("userValidateCheck").innerHTML = "Aadhar ID already exists!";
                document.getElementById("inputValuesCheck").innerHTML = null;
            }
        }
        else {
            document.getElementById("userConfirmationCheck").innerHTML = null;
            document.getElementById("userValidateCheck").innerHTML = null;
        }
    },

    //validating user deatils
    validateUser: async function() {
        var _aadhar_number = document.getElementById('inputaadharnumber2').value;
        if (_aadhar_number.length==0) {
            document.getElementById("verified").innerHTML = "Enter Aadhar ID!";
        }
        else {
            let result = await this.contractInstance.methods.validateUser(_aadhar_number).call();
            console.log(result);
            
                if(result) {
                    document.getElementById("verified").innerHTML = "Verified ✔️";
                }
                else {
                    document.getElementById("verified").innerHTML = "Unverified ❌";
                }
        }
    }
}

window.App = App;

window.addEventListener("load", function() {
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:7545"),
    );

  App.start();
});