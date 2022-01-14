// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
 
contract KycContract {
 
    struct aadharDetails
    {
        string fullname;
        string fathername;
        string aadhar_number;
        uint phone_number;
        string location;
        string gender;
        string dob;
    }

    // Mappping
    mapping(string =>aadharDetails) userMap;

    // Initializing array
    string[] UsersArray ;

    // set Function for setUser   
    function setUser
    (
        string memory _fullname,
        string memory _fathername,
        string memory _aadhar_number,
        uint _phone_number,
        string memory _location,
        string memory _gender,
        string memory _dob
    )
 
    public
    {
        require(keccak256(abi.encodePacked((userMap[_aadhar_number].aadhar_number)))
                        != keccak256(abi.encodePacked(_aadhar_number)));

        userMap[_aadhar_number].aadhar_number = _aadhar_number ;
        userMap[_aadhar_number].fullname = _fullname ;
        userMap[_aadhar_number].fathername = _fathername ;
        userMap[_aadhar_number].phone_number = _phone_number ;
        userMap[_aadhar_number].location = _location ;
        userMap[_aadhar_number].gender = _gender ;
        userMap[_aadhar_number].dob = _dob ;
 
        UsersArray.push(_aadhar_number) ;

    }
 
    function getUser(string memory _aadhar_number) view public returns(string memory ,string memory, string memory, uint, string memory, string memory, string memory)
    {
        return
        (
            userMap[_aadhar_number].fullname,
            userMap[_aadhar_number].fathername,
            userMap[_aadhar_number].aadhar_number,
            userMap[_aadhar_number].phone_number,
            userMap[_aadhar_number].location,
            userMap[_aadhar_number].gender,
            userMap[_aadhar_number].dob
        );
    }
 
    function validateUser(string memory _aadhar_number) view public returns(bool)
    {
        if (keccak256(abi.encodePacked((userMap[_aadhar_number].aadhar_number))) == keccak256(abi.encodePacked(_aadhar_number)))
            return true ;
        else return false ;
    }
}