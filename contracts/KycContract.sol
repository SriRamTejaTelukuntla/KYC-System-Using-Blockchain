// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
 
contract KycContract {
 
    struct registeredUserDetails {
        string fullname;
        string fathername;
        string aadhar_number;
        uint phone_number;
        string useraddress;
        string gender;
        string dob;
    }

    struct verifiedUserDetails {
        string fullname;
        string fathername;
        string aadhar_number;
        uint phone_number;
        string useraddress;
        string gender;
        string dob;
    }

    // Mappping
    mapping(string =>registeredUserDetails) registeredUserMap;
    mapping(string =>verifiedUserDetails) verifiedUserMap;

    // Initializing array
    string[] registeredUsersArray;
    string[] verifiedUsersArray;

    // set Function for setUser   
    function setRegisteredUser (string memory _fullname, string memory _fathername, string memory _aadhar_number,
                                uint _phone_number, string memory _useraddress, string memory _gender, string memory _dob)
    public {
        require(keccak256(abi.encodePacked((registeredUserMap[_aadhar_number].aadhar_number)))
                        != keccak256(abi.encodePacked(_aadhar_number)));

        registeredUserMap[_aadhar_number].fullname = _fullname ;
        registeredUserMap[_aadhar_number].fathername = _fathername ;
        registeredUserMap[_aadhar_number].aadhar_number = _aadhar_number ;
        registeredUserMap[_aadhar_number].phone_number = _phone_number ;
        registeredUserMap[_aadhar_number].useraddress = _useraddress ;
        registeredUserMap[_aadhar_number].gender = _gender ;
        registeredUserMap[_aadhar_number].dob = _dob ;
 
        registeredUsersArray.push(_aadhar_number) ;
    }
 
    function setVerifiedUser (string memory _fullname, string memory _fathername, string memory _aadhar_number,
                              uint _phone_number, string memory _useraddress, string memory _gender, string memory _dob)
    public {
        require(keccak256(abi.encodePacked((verifiedUserMap[_aadhar_number].aadhar_number)))
            != keccak256(abi.encodePacked(_aadhar_number)));

        verifiedUserMap[_aadhar_number].fullname = _fullname ;
        verifiedUserMap[_aadhar_number].fathername = _fathername ;
        verifiedUserMap[_aadhar_number].aadhar_number = _aadhar_number ;
        verifiedUserMap[_aadhar_number].phone_number = _phone_number ;
        verifiedUserMap[_aadhar_number].useraddress = _useraddress ;
        verifiedUserMap[_aadhar_number].gender = _gender ;
        verifiedUserMap[_aadhar_number].dob = _dob ;
 
        verifiedUsersArray.push(_aadhar_number) ;
    }

    function getRegisteredUser (string memory _aadhar_number) view public
        returns(string memory ,string memory, string memory, uint, string memory, string memory, string memory) {
        return
        (
            registeredUserMap[_aadhar_number].fullname,
            registeredUserMap[_aadhar_number].fathername,
            registeredUserMap[_aadhar_number].aadhar_number,
            registeredUserMap[_aadhar_number].phone_number,
            registeredUserMap[_aadhar_number].useraddress,
            registeredUserMap[_aadhar_number].gender,
            registeredUserMap[_aadhar_number].dob
        );
    }
 
    function getVerifiedUser (string memory _aadhar_number) view public
        returns(string memory ,string memory, string memory, uint, string memory, string memory, string memory) {
        return
        (
            verifiedUserMap[_aadhar_number].fullname,
            verifiedUserMap[_aadhar_number].fathername,
            verifiedUserMap[_aadhar_number].aadhar_number,
            verifiedUserMap[_aadhar_number].phone_number,
            verifiedUserMap[_aadhar_number].useraddress,
            verifiedUserMap[_aadhar_number].gender,
            verifiedUserMap[_aadhar_number].dob
        );
    }

    function checkVerifiedUser (string memory _aadhar_number) view public returns(bool) {
        if (keccak256(abi.encodePacked((verifiedUserMap[_aadhar_number].aadhar_number)))
            == keccak256(abi.encodePacked(_aadhar_number)))
            return true;
        else
            return false;
    }
    
    function checkRegisteredUser (string memory _aadhar_number) view public returns(bool) {
        if (keccak256(abi.encodePacked((registeredUserMap[_aadhar_number].aadhar_number))) 
            == keccak256(abi.encodePacked(_aadhar_number)))
            return true;
        else
            return false;
    }

    function getCountOfRegisteredUsers() view public returns (uint)
    {
        return registeredUsersArray.length;
    }

    function getCountOfVerifiedUsers() view public returns (uint)
    {
        return verifiedUsersArray.length;
    }

    function getAllRegisteredIDs() view public returns(string[] memory)
    {
            return registeredUsersArray;
    }

    function getAllVerifiedIDs() view public returns(string[] memory)
    {
            return verifiedUsersArray;
    }
}