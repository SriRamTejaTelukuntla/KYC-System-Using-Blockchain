// Import Web3 JS library
const Web3 = require('web3');
const web3 = new Web3("HTTP://127.0.0.1:7545");

// Import the ABI definition of the DemoContract
const artifact = require('../../build/contracts/KycContract.json');

const deployedContract = artifact.networks[5777];
const contractAddress = deployedContract.address;

const MIN_GAS = 1000000;

function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
        }
    }
}

let table = document.querySelector("table");

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

    //setting details of user 
    setRegisteredUser: async function() {
        const _fullname = document.getElementById('userFullName').value;
        const _fathername = document.getElementById('userFatherName').value;
        const _aadhar_number = document.getElementById('userAadharNumber').value;
        const _phone_number = document.getElementById('userPhoneNumber').value;
        const _useraddress = document.getElementById('userAddress').value;
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
            else if (_useraddress == "")
                document.getElementById("inputValuesCheck").innerHTML = "Enter your Location!";
            else if (_gender == "")
                document.getElementById("inputValuesCheck").innerHTML = "Enter your Gender!";
            else if (_dob == "")
                document.getElementById("inputValuesCheck").innerHTML = "Enter your Date of Birth!";
            else
                valuesCheck = true;
        
        if (valuesCheck){
            const validate = await this.contractInstance.methods.checkRegisteredUser(_aadhar_number).call();

            if (!validate){
                console.log(_fullname, _fathername, _aadhar_number, _phone_number, _useraddress, _gender, _dob,);
                const gas = await this.contractInstance.methods.setRegisteredUser(_fullname, _fathername, _aadhar_number, _phone_number, _useraddress, _gender, _dob).estimateGas({
                    from: this.accounts[0]
                });
                await this.contractInstance.methods.setRegisteredUser(_fullname, _fathername, _aadhar_number, _phone_number, _useraddress, _gender, _dob).send({
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

    getRegisteredUser: async function() {
        const _aadhar_number = document.getElementById('inputaadharnumber').value;
        if (_aadhar_number.length==0) {
            document.getElementById("exist").innerHTML = "Enter Aadhar ID!";
            document.getElementById("full-name").innerHTML =  null;
            document.getElementById("father-name").innerHTML =  null;
            document.getElementById("aadhar-number").innerHTML = null;
            document.getElementById("phone-number").innerHTML =  null;
            document.getElementById("address").innerHTML = null;
            document.getElementById("gender").innerHTML =  null;
            document.getElementById("dob").innerHTML =  null; 
        }
        else {
            const validate = await this.contractInstance.methods.checkRegisteredUser(_aadhar_number).call();
       
            if (validate){
                await this.contractInstance.methods.getRegisteredUser(_aadhar_number).call().then(function(result){
                    console.log(result)
                    document.getElementById("full-name").innerHTML = "Full Name: " + result[0];
                    document.getElementById("father-name").innerHTML =  "Father Name: " + result[1];
                    document.getElementById("aadhar-number").innerHTML = "Aadhar Number: " + result[2];
                    document.getElementById("phone-number").innerHTML =  "Phone Number: " + result[3];
                    document.getElementById("address").innerHTML = "Address: " + result[4];
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
                document.getElementById("address").innerHTML = null;
                document.getElementById("gender").innerHTML =  null;
                document.getElementById("dob").innerHTML =  null; 
            }   
        } 
    },

    viewRegisteredUsers: async function(){
        this.accounts = await web3.eth.getAccounts();
        this.contractInstance = new web3.eth.Contract(
            artifact.abi,
            contractAddress

        );
        const RegisteredUserCount = await this.contractInstance.methods.getCountOfRegisteredUsers().call();
        const RegisteredUserIDs = await this.contractInstance.methods.getAllRegisteredIDs().call();
        let registeredUser;

        for (let i=0; i<RegisteredUserCount; i++) {
            await this.contractInstance.methods.getRegisteredUser(RegisteredUserIDs[i]).call().then(function(result) {
                console.log(result);
                registeredUser = [
                    { 
                        Index: i+1, "Full Name": result[0], "Father Name": result[1], "Aadhar Number": result[2], "Phone Number": result[3], 
                        "Address": result[4], Gender: result[5], "Date Of Birth": result[6]
                    },
                ];

                let data = Object.keys(registeredUser[0]);
                if (i==0)
                    generateTableHead(table, data);
                generateTable(table, registeredUser);
            });
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
