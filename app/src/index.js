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

function selectRowBank() {
    var table = document.getElementById('pending-table');
    var cells = table.getElementsByTagName('td');

    for (var i = 0; i < cells.length; i++) {
        // Take each cell
        var cell = cells[i];
        // do something on onclick event for cell
        cell.onclick = function () {
            // Get the row id where the cell exists
            var rowId = this.parentNode.rowIndex;

            var rowsNotSelected = table.getElementsByTagName('tr');
            for (var row = 0; row < rowsNotSelected.length; row++) {
                rowsNotSelected[row].style.backgroundColor = "";
                rowsNotSelected[row].style.fontWeight = "";
                rowsNotSelected[row].classList.remove('selected');
            }
            var rowSelected = table.getElementsByTagName('tr')[rowId];
            rowSelected.style.backgroundColor = "#aad7ec";
            rowSelected.style.fontWeight = 800;
            rowSelected.className += " selected";

            var row_value = [];
            for (var i= 0; i < rowSelected.cells.length; i++) {
                row_value[i] = rowSelected.cells[i].innerHTML;
            }
            console.log("Selected row: "+row_value);
            document.getElementById("display-full-name").innerHTML =  row_value[1];
            document.getElementById("display-father-name").innerHTML =  row_value[2];
            document.getElementById("display-aadhar-number").innerHTML = row_value[3];
            document.getElementById("display-phone-number").innerHTML =  row_value[4];
            document.getElementById("display-address").innerHTML = row_value[5];
            document.getElementById("display-gender").innerHTML =  row_value[6];
            document.getElementById("display-dob").innerHTML =  row_value[7];
            document.getElementById("display-message").innerHTML = null;
        
            var textcontainer = document.getElementById("text-hidden");
            textcontainer.className = 'text-container';
        }
    }
}

function selectRowDemat() {
    var table = document.getElementById('pending-table');
    var cells = table.getElementsByTagName('td');

    for (var i = 0; i < cells.length; i++) {
        // Take each cell
        var cell = cells[i];
        // do something on onclick event for cell
        cell.onclick = function () {
            // Get the row id where the cell exists
            var rowId = this.parentNode.rowIndex;

            var rowsNotSelected = table.getElementsByTagName('tr');
            for (var row = 0; row < rowsNotSelected.length; row++) {
                rowsNotSelected[row].style.backgroundColor = "";
                rowsNotSelected[row].style.fontWeight = "";
                rowsNotSelected[row].classList.remove('selected');
            }
            var rowSelected = table.getElementsByTagName('tr')[rowId];
            rowSelected.style.backgroundColor = "#aad7ec";
            rowSelected.style.fontWeight = 800;
            rowSelected.className += " selected";

            var row_value = [];
            for (var i= 0; i < rowSelected.cells.length; i++) {
                row_value[i] = rowSelected.cells[i].innerHTML;
            }
            console.log("Selected row: "+row_value);
            document.getElementById("display-full-name").innerHTML =  row_value[1];
            document.getElementById("display-father-name").innerHTML =  row_value[2];
            document.getElementById("display-pan-number").innerHTML = row_value[3];
            document.getElementById("display-phone-number").innerHTML =  row_value[4];
            document.getElementById("display-dob").innerHTML =  row_value[5];
            document.getElementById("display-message").innerHTML = null;
        
            var textcontainer = document.getElementById("text-hidden");
            textcontainer.className = 'text-container';
        }
    }
}

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

    //setting details of user for bank 
    setRegisteredBankUser: async function() {
        const _fullname = document.getElementById('userFullName').value.trim();
        const _fathername = document.getElementById('userFatherName').value.trim();
        const _aadhar_number = document.getElementById('userAadharNumber').value.trim();
        const _phone_number = document.getElementById('userPhoneNumber').value.trim();
        const _useraddress = document.getElementById('userAddress').value.trim();
        const _gender = document.getElementById('userGender').value.trim();
        const _dob = document.getElementById('userDOB').value.trim();

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
            const validate = await this.contractInstance.methods.checkRegisteredBankUser(_aadhar_number).call();

            if (!validate){
                console.log(_fullname, _fathername, _aadhar_number, _phone_number, _useraddress, _gender, _dob,);
                const gas = await this.contractInstance.methods.setRegisteredBankUser(_fullname, _fathername, _aadhar_number, _phone_number, _useraddress, _gender, _dob).estimateGas({
                    from: this.accounts[0]
                });
                await this.contractInstance.methods.setRegisteredBankUser(_fullname, _fathername, _aadhar_number, _phone_number, _useraddress, _gender, _dob).send({
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

    getRegisteredBankUser: async function() {
        const _aadhar_number = document.getElementById('inputaadharnumber').value.trim();
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
            const validate = await this.contractInstance.methods.checkRegisteredBankUser(_aadhar_number).call();
       
            if (validate){
                await this.contractInstance.methods.getRegisteredBankUser(_aadhar_number).call().then(function(result){
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

    setVerifiedBankUser: async function () {
        document.getElementById("display-message").innerHTML = null;
        let _fullname = document.getElementById("display-full-name").innerHTML;
        let _fathername = document.getElementById("display-father-name").innerHTML;
        let _aadhar_number = document.getElementById("display-aadhar-number").innerHTML;
        let _phone_number = document.getElementById("display-phone-number").innerHTML;
        let _useraddress = document.getElementById("display-address").innerHTML;
        let _gender = document.getElementById("display-gender").innerHTML;
        let _dob = document.getElementById("display-dob").innerHTML;

        console.log(_fullname, _fathername, _aadhar_number, _phone_number, _useraddress, _gender, _dob);
        const gas = await this.contractInstance.methods.setVerifiedBankUser(_fullname, _fathername, _aadhar_number, _phone_number, _useraddress, _gender, _dob).estimateGas({
            from: this.accounts[0]
        });
        await this.contractInstance.methods.setVerifiedBankUser(_fullname, _fathername, _aadhar_number, _phone_number, _useraddress, _gender, _dob).send({
            from: this.accounts[0], gas: Math.max(gas, MIN_GAS)
        });
        document.getElementById("display-message").innerHTML = "User verified";
    },

    viewRegisteredBankUsers: async function(){
        this.accounts = await web3.eth.getAccounts();
        this.contractInstance = new web3.eth.Contract(
            artifact.abi,
            contractAddress

        );
        
        const RegisteredBankUserCount = await this.contractInstance.methods.getCountOfRegisteredBankUsers().call();
        const RegisteredBankUserIDs = await this.contractInstance.methods.getAllRegisteredBankUsersIDs().call();
        let registeredBankUser;

        let tableCreated = false;
        for (let i=0; i<RegisteredBankUserCount; i++) {
            tableCreated = true;
            await this.contractInstance.methods.getRegisteredBankUser(RegisteredBankUserIDs[i]).call().then(function(result) {
                console.log(result);
                registeredBankUser = [
                    { 
                        Index: i+1, "Full Name": result[0], "Father Name": result[1], "Aadhar Number": result[2], "Phone Number": result[3], 
                        "Address": result[4], Gender: result[5], "Date Of Birth": result[6]
                    },
                ];

                let data = Object.keys(registeredBankUser[0]);
                if (i==0)
                    generateTableHead(table, data);
                generateTable(table, registeredBankUser);
            });
        }
        if (!tableCreated) {
           document.getElementById("register-table-message").innerHTML = "No registered users found!";
        }
    },
    
    viewPendingBankUsers: async function(){
        this.accounts = await web3.eth.getAccounts();
        this.contractInstance = new web3.eth.Contract(
            artifact.abi,
            contractAddress
        );
        
        const RegisteredBankUserCount = await this.contractInstance.methods.getCountOfRegisteredBankUsers().call();
        const RegisteredBankUserIDs = await this.contractInstance.methods.getAllRegisteredBankUsersIDs().call();
        let registeredBankUser;
        console.log(RegisteredBankUserIDs);
        
        let tableCreated = false;
        let j = 0;
        for (let i=0; i<RegisteredBankUserCount; i++) {
            var validate = await this.contractInstance.methods.checkVerifiedBankUser(RegisteredBankUserIDs[i]).call();
            if (!validate) {
                tableCreated = true;
                await this.contractInstance.methods.getRegisteredBankUser(RegisteredBankUserIDs[i]).call().then(function(result) {
                    console.log(result);
                    registeredBankUser = [
                        { 
                            Index: j+1, "Full Name": result[0], "Father Name": result[1], "Aadhar Number": result[2], "Phone Number": result[3], 
                            "Address": result[4], Gender: result[5], "Date Of Birth": result[6]
                        },
                    ];
    
                    let data = Object.keys(registeredBankUser[0]);
                    if (j==0)
                        generateTableHead(table, data);
                    generateTable(table, registeredBankUser);
                });
                j++;
            }
        }
        if (tableCreated) {
            selectRowBank();
        } else {
            document.getElementById("pending-table-message").innerHTML = "No pending users found!";
        }
    },

    viewVerifiedBankUsers: async function(){
        this.accounts = await web3.eth.getAccounts();
        this.contractInstance = new web3.eth.Contract(
            artifact.abi,
            contractAddress
        );

        const VerifiedBankUserCount = await this.contractInstance.methods.getCountOfVerifiedBankUsers().call();
        const VerifiedBankUserIDs = await this.contractInstance.methods.getAllVerifiedBankUsersIDs().call();
        let verifiedBankUser;

        let tableCreated = false;
        for (let i=0; i<VerifiedBankUserCount; i++) {
            tableCreated = true;
            await this.contractInstance.methods.getVerifiedBankUser(VerifiedBankUserIDs[i]).call().then(function(result) {
                console.log(result);
                verifiedBankUser = [
                    { 
                        Index: i+1, "Full Name": result[0], "Father Name": result[1], "Aadhar Number": result[2], "Phone Number": result[3], 
                        "Address": result[4], Gender: result[5], "Date Of Birth": result[6]
                    },
                ];

                let data = Object.keys(verifiedBankUser[0]);
                if (i==0)
                    generateTableHead(table, data);
                generateTable(table, verifiedBankUser);
            });
        }
        if (!tableCreated) {
            document.getElementById("verified-table-message").innerHTML = "No verified users found!";
         }
    },

    viewVerifiedBankUserList: async function() {
        const _aadhar_number = document.getElementById('checkinputaadharnumber').value.trim();
        if (_aadhar_number.length==0) {
            document.getElementById("exist1").innerHTML = "Enter Aadhar ID!";
            document.getElementById("display-message").innerHTML = null;
            document.getElementById("display-message-error").innerHTML = null;
        }
        else {
            const validate = await this.contractInstance.methods.checkVerifiedBankUser(_aadhar_number).call();
       
            if (validate){
                await this.contractInstance.methods.getVerifiedBankUser(_aadhar_number).call().then(function(result){
                    console.log(result)
                    document.getElementById("display-message").innerHTML = "Aadhar ID verified!";
                    document.getElementById("display-message-error").innerHTML = null;
                    document.getElementById("exist1").innerHTML = null;
                });  
            }
            else{
                document.getElementById("display-message-error").innerHTML = "Verification is still pending!";
                document.getElementById("display-message").innerHTML = null;
                document.getElementById("exist1").innerHTML = null;
            }   
        } 
    },

    //setting details of user for demat 
    setRegisteredDematUser: async function() {
        const _fullname = document.getElementById('userFullName').value.trim();
        const _fathername = document.getElementById('userFatherName').value.trim();
        const _pan_number = document.getElementById('userPanNumber').value.trim();
        const _phone_number = document.getElementById('userPhoneNumber').value.trim();
        const _dob = document.getElementById('userDOB').value.trim();

        let valuesCheck = false;
            if (_fullname == "")
                document.getElementById("inputValuesCheck").innerHTML = "Enter your Full Name!";
            else if (_fathername == "")
                document.getElementById("inputValuesCheck").innerHTML = "Enter your Father Name!";
            else if (_pan_number == "")
                document.getElementById("inputValuesCheck").innerHTML = "Enter your Pan Number!";
            else if (_phone_number.length == 0)
                document.getElementById("inputValuesCheck").innerHTML = "Enter your Phone Number!";
            else if (_phone_number.length != 10)
                document.getElementById("inputValuesCheck").innerHTML = "Enter your 10 digit Phone Number!";
            else if (_dob == "")
                document.getElementById("inputValuesCheck").innerHTML = "Enter your Date of Birth!";
            else
                valuesCheck = true;
        
        if (valuesCheck){
            const validate = await this.contractInstance.methods.checkRegisteredDematUser(_pan_number).call();

            if (!validate){
                console.log(_fullname, _fathername, _pan_number, _phone_number, _dob);
                const gas = await this.contractInstance.methods.setRegisteredDematUser(_fullname, _fathername, _pan_number, _phone_number, _dob).estimateGas({
                    from: this.accounts[0]
                });
                await this.contractInstance.methods.setRegisteredDematUser(_fullname, _fathername, _pan_number, _phone_number, _dob).send({
                    from: this.accounts[0], gas: Math.max(gas, MIN_GAS)
                }); 
                document.getElementById("userConfirmationCheck").innerHTML = "Success!";
                document.getElementById("userValidateCheck").innerHTML = null;
                document.getElementById("inputValuesCheck").innerHTML = null;
            }
            else{
                document.getElementById("userConfirmationCheck").innerHTML = null;
                document.getElementById("userValidateCheck").innerHTML = "Pan ID already exists!";
                document.getElementById("inputValuesCheck").innerHTML = null;
            }
        }
        else {
            document.getElementById("userConfirmationCheck").innerHTML = null;
            document.getElementById("userValidateCheck").innerHTML = null;
        }
    },

    getRegisteredDematUser: async function() {
        const _pan_number = document.getElementById('inputpannumber').value.trim();
        if (_pan_number.length==0) {
            document.getElementById("exist").innerHTML = "Enter Pan ID!";
            document.getElementById("full-name").innerHTML =  null;
            document.getElementById("father-name").innerHTML =  null;
            document.getElementById("pan-number").innerHTML = null;
            document.getElementById("phone-number").innerHTML =  null;
            document.getElementById("dob").innerHTML =  null; 
        }
        else {
            const validate = await this.contractInstance.methods.checkRegisteredDematUser(_pan_number).call();
       
            if (validate){
                await this.contractInstance.methods.getRegisteredDematUser(_pan_number).call().then(function(result){
                    console.log(result)
                    document.getElementById("full-name").innerHTML = "Full Name: " + result[0];
                    document.getElementById("father-name").innerHTML =  "Father Name: " + result[1];
                    document.getElementById("pan-number").innerHTML = "Pan Number: " + result[2];
                    document.getElementById("phone-number").innerHTML =  "Phone Number: " + result[3];
                    document.getElementById("dob").innerHTML =  "Date Of Birth: " + result[4];
                    document.getElementById("exist").innerHTML = null;
                });  
            }
            else{
                document.getElementById("exist").innerHTML = "Pan ID Does Not Exists!";
                document.getElementById("full-name").innerHTML =  null;
                document.getElementById("father-name").innerHTML =  null;
                document.getElementById("pan-number").innerHTML = null;
                document.getElementById("phone-number").innerHTML =  null;
                document.getElementById("dob").innerHTML =  null;
            }   
        } 
    },

    setVerifiedDematUser: async function () {
        document.getElementById("display-message").innerHTML = null;
        let _fullname = document.getElementById("display-full-name").innerHTML;
        let _fathername = document.getElementById("display-father-name").innerHTML;
        let _pan_number = document.getElementById("display-pan-number").innerHTML;
        let _phone_number = document.getElementById("display-phone-number").innerHTML;
        let _dob = document.getElementById("display-dob").innerHTML;

        console.log(_fullname, _fathername, _pan_number, _phone_number, _dob);
        const gas = await this.contractInstance.methods.setVerifiedDematUser(_fullname, _fathername, _pan_number, _phone_number, _dob).estimateGas({
            from: this.accounts[0]
        });
        await this.contractInstance.methods.setVerifiedDematUser(_fullname, _fathername, _pan_number, _phone_number, _dob).send({
            from: this.accounts[0], gas: Math.max(gas, MIN_GAS)
        });
        document.getElementById("display-message").innerHTML = "User verified";
    },

    viewRegisteredDematUsers: async function(){
        this.accounts = await web3.eth.getAccounts();
        this.contractInstance = new web3.eth.Contract(
            artifact.abi,
            contractAddress

        );
        
        const RegisteredDematUserCount = await this.contractInstance.methods.getCountOfRegisteredDematUsers().call();
        const RegisteredDematUserIDs = await this.contractInstance.methods.getAllRegisteredDematUsersIDs().call();
        let registeredDematUser;

        let tableCreated = false;
        for (let i=0; i<RegisteredDematUserCount; i++) {
            tableCreated = true;
            await this.contractInstance.methods.getRegisteredDematUser(RegisteredDematUserIDs[i]).call().then(function(result) {
                console.log(result);
                registeredDematUser = [
                    { 
                        Index: i+1, "Full Name": result[0], "Father Name": result[1], "Pan Number": result[2], "Phone Number": result[3], "Date Of Birth": result[4]
                    },
                ];

                let data = Object.keys(registeredDematUser[0]);
                if (i==0)
                    generateTableHead(table, data);
                generateTable(table, registeredDematUser);
            });
        }
        if (!tableCreated) {
           document.getElementById("register-table-message").innerHTML = "No registered users found!";
        }
    },

    viewPendingDematUsers: async function(){
        this.accounts = await web3.eth.getAccounts();
        this.contractInstance = new web3.eth.Contract(
            artifact.abi,
            contractAddress
        );
        
        const RegisteredDematUserCount = await this.contractInstance.methods.getCountOfRegisteredDematUsers().call();
        const RegisteredDematUserIDs = await this.contractInstance.methods.getAllRegisteredDematUsersIDs().call();
        let registeredDematUser;
        console.log(RegisteredDematUserIDs);
        
        let tableCreated = false;
        let j = 0;
        for (let i=0; i<RegisteredDematUserCount; i++) {
            var validate = await this.contractInstance.methods.checkVerifiedDematUser(RegisteredDematUserIDs[i]).call();
            if (!validate) {
                tableCreated = true;
                await this.contractInstance.methods.getRegisteredDematUser(RegisteredDematUserIDs[i]).call().then(function(result) {
                    console.log(result);
                    registeredDematUser = [
                        { 
                            Index: j+1, "Full Name": result[0], "Father Name": result[1], "Pan Number": result[2], "Phone Number": result[3], "Date Of Birth": result[4]
                        },
                    ];
    
                    let data = Object.keys(registeredDematUser[0]);
                    if (j==0)
                        generateTableHead(table, data);
                    generateTable(table, registeredDematUser);
                });
                j++;
            }
        }
        if (tableCreated) {
            selectRowDemat();
        } else {
            document.getElementById("pending-table-message").innerHTML = "No pending users found!";
        }
    },

    viewVerifiedDematUsers: async function(){
        this.accounts = await web3.eth.getAccounts();
        this.contractInstance = new web3.eth.Contract(
            artifact.abi,
            contractAddress
        );

        const VerifiedDematUserCount = await this.contractInstance.methods.getCountOfVerifiedDematUsers().call();
        const VerifiedDematUserIDs = await this.contractInstance.methods.getAllVerifiedDematUsersIDs().call();
        let verifiedDematUser;

        let tableCreated = false;
        for (let i=0; i<VerifiedDematUserCount; i++) {
            tableCreated = true;
            await this.contractInstance.methods.getVerifiedDematUser(VerifiedDematUserIDs[i]).call().then(function(result) {
                console.log(result);
                verifiedDematUser = [
                    { 
                        Index: i+1, "Full Name": result[0], "Father Name": result[1], "Pan Number": result[2], "Phone Number": result[3], "Date Of Birth": result[4]
                    },
                ];

                let data = Object.keys(verifiedDematUser[0]);
                if (i==0)
                    generateTableHead(table, data);
                generateTable(table, verifiedDematUser);
            });
        }
        if (!tableCreated) {
            document.getElementById("verified-table-message").innerHTML = "No verified users found!";
         }
    },

    viewVerifiedDematUserList: async function() {
        const _pan_number = document.getElementById('checkinputpannumber').value.trim();
        if (_pan_number.length==0) {
            document.getElementById("exist1").innerHTML = "Enter Pan ID!";
            document.getElementById("display-message").innerHTML = null;
            document.getElementById("display-message-error").innerHTML = null;
        }
        else {
            const validate = await this.contractInstance.methods.checkVerifiedDematUser(_pan_number).call();
       
            if (validate){
                await this.contractInstance.methods.getVerifiedDematUser(_pan_number).call().then(function(result){
                    console.log(result)
                    document.getElementById("display-message").innerHTML = "Pan ID verified!";
                    document.getElementById("display-message-error").innerHTML = null;
                    document.getElementById("exist1").innerHTML = null;
                });  
            }
            else{
                document.getElementById("display-message-error").innerHTML = "Verification is still pending!";
                document.getElementById("display-message").innerHTML = null;
                document.getElementById("exist1").innerHTML = null;
            }   
        } 
    },
}

window.App = App;

window.addEventListener("load", function() {
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:7545"),
    );

  App.start();
});



//Homepage code

(function() {
    
    window.onscroll = function () {
   
        // show or hide the back-top-top button
        var backToTo = document.querySelector(".scroll-top");
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            backToTo.style.display = "flex";
        } else {
            backToTo.style.display = "none";
        }
    };

})();
