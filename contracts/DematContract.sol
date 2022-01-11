// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10 ;
import "./KycContract.sol" ;

contract DematContract 
{
    address kycaddress = 0x78469c63d142caC46373D714d896E20Dd46cB506;
    KycContract user;

    constructor ()
    {
    user = KycContract(kycaddress);
    }  
     
    function validateUser(string memory _aadhar_number) view public returns(bool)
    {
        if (user.validateUser(_aadhar_number))
            return true ;
        else return false ;    
    }

    function getUserDetails(string memory _aadhar_number) view public returns (string memory ,string memory, string memory, uint, string memory, string memory, string memory)
    {
        return (user.getUser(_aadhar_number)) ;
    } 
}