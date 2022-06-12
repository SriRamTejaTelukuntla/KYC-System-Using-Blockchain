// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
 
contract KycContract {

    // Structure of Bank
    struct registeredBankUserDetails {
        string fullname;
        string fathername;
        string aadhar_number;
        uint phone_number;
        string useraddress;
        string gender;
        string dob;
    }

    struct verifiedBankUserDetails {
        string fullname;
        string fathername;
        string aadhar_number;
        uint phone_number;
        string useraddress;
        string gender;
        string dob;
    }

    // Structure of Demat
    struct registeredDematUserDetails {
        string fullname;
        string fathername;
        string pan_number;
        uint phone_number;
        string dob;
    }

    struct verifiedDematUserDetails {
        string fullname;
        string fathername;
        string pan_number;
        uint phone_number;
        string dob;
    }

    // Mappping of Bank
    mapping(string =>registeredBankUserDetails) registeredBankUserMap;
    mapping(string =>verifiedBankUserDetails) verifiedBankUserMap;

    // Initializing array of Bank
    string[] registeredBankUsersArray;
    string[] verifiedBankUsersArray;

    // Mappping of Demat
    mapping(string =>registeredDematUserDetails) registeredDematUserMap;
    mapping(string =>verifiedDematUserDetails) verifiedDematUserMap;

    // Initializing array of Demat
    string[] registeredDematUsersArray;
    string[] verifiedDematUsersArray;

    // set Function for BankUser   
    function setRegisteredBankUser (string memory _fullname, string memory _fathername, string memory _aadhar_number,
                                uint _phone_number, string memory _useraddress, string memory _gender, string memory _dob)
    public {
        require(keccak256(abi.encodePacked((registeredBankUserMap[_aadhar_number].aadhar_number)))
                        != keccak256(abi.encodePacked(_aadhar_number)));

        registeredBankUserMap[_aadhar_number].fullname = _fullname ;
        registeredBankUserMap[_aadhar_number].fathername = _fathername ;
        registeredBankUserMap[_aadhar_number].aadhar_number = _aadhar_number ;
        registeredBankUserMap[_aadhar_number].phone_number = _phone_number ;
        registeredBankUserMap[_aadhar_number].useraddress = _useraddress ;
        registeredBankUserMap[_aadhar_number].gender = _gender ;
        registeredBankUserMap[_aadhar_number].dob = _dob ;
 
        registeredBankUsersArray.push(_aadhar_number) ;
    }
 
    function setVerifiedBankUser (string memory _fullname, string memory _fathername, string memory _aadhar_number,
                              uint _phone_number, string memory _useraddress, string memory _gender, string memory _dob)
    public {
        require(keccak256(abi.encodePacked((verifiedBankUserMap[_aadhar_number].aadhar_number)))
            != keccak256(abi.encodePacked(_aadhar_number)));

        verifiedBankUserMap[_aadhar_number].fullname = _fullname ;
        verifiedBankUserMap[_aadhar_number].fathername = _fathername ;
        verifiedBankUserMap[_aadhar_number].aadhar_number = _aadhar_number ;
        verifiedBankUserMap[_aadhar_number].phone_number = _phone_number ;
        verifiedBankUserMap[_aadhar_number].useraddress = _useraddress ;
        verifiedBankUserMap[_aadhar_number].gender = _gender ;
        verifiedBankUserMap[_aadhar_number].dob = _dob ;
 
        verifiedBankUsersArray.push(_aadhar_number) ;
    }

         // set Function for DematUser   
    function setRegisteredDematUser (string memory _fullname, string memory _fathername, string memory  _pan_number,
                                uint _phone_number, string memory _dob)
    public {
        require(keccak256(abi.encodePacked((registeredDematUserMap[_pan_number].pan_number)))
                        != keccak256(abi.encodePacked(_pan_number)));

        registeredDematUserMap[_pan_number].fullname = _fullname ;
        registeredDematUserMap[_pan_number].fathername = _fathername ;
        registeredDematUserMap[_pan_number].pan_number =  _pan_number ;
        registeredDematUserMap[_pan_number].phone_number = _phone_number ;
        registeredDematUserMap[_pan_number].dob = _dob ;
 
        registeredDematUsersArray.push(_pan_number) ;
    }

     function setVerifiedDematUser (string memory _fullname, string memory _fathername, string memory  _pan_number,
                                uint _phone_number, string memory _dob)
    public {
        require(keccak256(abi.encodePacked((verifiedDematUserMap[_pan_number].pan_number)))
                        != keccak256(abi.encodePacked(_pan_number)));

        verifiedDematUserMap[_pan_number].fullname = _fullname ;
        verifiedDematUserMap[_pan_number].fathername = _fathername ;
        verifiedDematUserMap[_pan_number].pan_number =  _pan_number ;
        verifiedDematUserMap[_pan_number].phone_number = _phone_number ;
        verifiedDematUserMap[_pan_number].dob = _dob ;
 
        verifiedDematUsersArray.push(_pan_number) ;
    }

    // get Function for BankUser   
    function getRegisteredBankUser (string memory _aadhar_number) view public
        returns(string memory ,string memory, string memory, uint, string memory, string memory, string memory) {
        return
        (
            registeredBankUserMap[_aadhar_number].fullname,
            registeredBankUserMap[_aadhar_number].fathername,
            registeredBankUserMap[_aadhar_number].aadhar_number,
            registeredBankUserMap[_aadhar_number].phone_number,
            registeredBankUserMap[_aadhar_number].useraddress,
            registeredBankUserMap[_aadhar_number].gender,
            registeredBankUserMap[_aadhar_number].dob
        );
    }
 
    function getVerifiedBankUser (string memory _aadhar_number) view public
        returns(string memory ,string memory, string memory, uint, string memory, string memory, string memory) {
        return
        (
            verifiedBankUserMap[_aadhar_number].fullname,
            verifiedBankUserMap[_aadhar_number].fathername,
            verifiedBankUserMap[_aadhar_number].aadhar_number,
            verifiedBankUserMap[_aadhar_number].phone_number,
            verifiedBankUserMap[_aadhar_number].useraddress,
            verifiedBankUserMap[_aadhar_number].gender,
            verifiedBankUserMap[_aadhar_number].dob
        );
    }

    // get Function for DematUser  
    function getRegisteredDematUser (string memory _pan_number) view public
        returns(string memory ,string memory, string memory, uint, string memory) {
        return
        (
            registeredDematUserMap[_pan_number].fullname,
            registeredDematUserMap[_pan_number].fathername,
            registeredDematUserMap[_pan_number].pan_number,
            registeredDematUserMap[_pan_number].phone_number,
            registeredDematUserMap[_pan_number].dob
        );
    }

    function getVerifiedDematUser (string memory _pan_number) view public
        returns(string memory ,string memory, string memory, uint, string memory) {
        return
        (
            verifiedDematUserMap[_pan_number].fullname,
            verifiedDematUserMap[_pan_number].fathername,
            verifiedDematUserMap[_pan_number].pan_number,
            verifiedDematUserMap[_pan_number].phone_number,
            verifiedDematUserMap[_pan_number].dob
        );
    }

    // check Function for BankUser  
    function checkVerifiedBankUser (string memory _aadhar_number) view public returns(bool) {
        if (keccak256(abi.encodePacked((verifiedBankUserMap[_aadhar_number].aadhar_number)))
            == keccak256(abi.encodePacked(_aadhar_number)))
            return true;
        else
            return false;
    }
    
    function checkRegisteredBankUser (string memory _aadhar_number) view public returns(bool) {
        if (keccak256(abi.encodePacked((registeredBankUserMap[_aadhar_number].aadhar_number))) 
            == keccak256(abi.encodePacked(_aadhar_number)))
            return true;
        else
            return false;
    }

    // check Function for DematUser  
    function checkVerifiedDematUser (string memory _pan_number) view public returns(bool) {
        if (keccak256(abi.encodePacked((verifiedDematUserMap[ _pan_number].pan_number)))
            == keccak256(abi.encodePacked( _pan_number)))
            return true;
        else
            return false;
    }
    
    function checkRegisteredDematUser (string memory _pan_number) view public returns(bool) {
        if (keccak256(abi.encodePacked((registeredDematUserMap[ _pan_number].pan_number))) 
            == keccak256(abi.encodePacked( _pan_number)))
            return true;
        else
            return false;
    }

    // count Function for BankUser  
    function getCountOfRegisteredBankUsers() view public returns (uint)
    {
        return registeredBankUsersArray.length;
    }

    function getCountOfVerifiedBankUsers() view public returns (uint)
    {
        return verifiedBankUsersArray.length;
    }

    // count Function for DematUser  
    function getCountOfRegisteredDematUsers() view public returns (uint)
    {
        return registeredDematUsersArray.length;
    }

    function getCountOfVerifiedDematUsers() view public returns (uint)
    {
        return verifiedDematUsersArray.length;
    }

    // get Function for BankUserIDs  
    function getAllRegisteredBankUsersIDs() view public returns(string[] memory)
    {
        return registeredBankUsersArray;
    }

    function getAllVerifiedBankUsersIDs() view public returns(string[] memory)
    {
        return verifiedBankUsersArray;
    }

    // get Function for DematUserIDs  
     function getAllRegisteredDematUsersIDs() view public returns(string[] memory)
    {
        return registeredDematUsersArray;
    }

    function getAllVerifiedDematUsersIDs() view public returns(string[] memory)
    {
        return verifiedDematUsersArray;
    }
}