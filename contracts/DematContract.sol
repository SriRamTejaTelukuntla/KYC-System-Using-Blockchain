// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10 ;
import "./KycContract.sol" ;

contract DematContract 
{
    address kycaddress = 0xce787A0D0AA99F20b4EcB6b3AB35bF7681AFCfc8;
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