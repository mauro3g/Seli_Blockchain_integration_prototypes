pragma solidity ^0.4.24;

contract UsersContract{
    struct User{
        string name;
        string surName;
    }

    mapping(address => User) private users;//enlace de direcciones ethereum a usuarios
    mapping(address => bool) private joinedUsers;// usuarios registrados en el smart contract
    address[] total; //array de las direcciones unicas

    function join (string name, string surName) public {
        require(!userJoined(msg.sender)); //si esq el usuario no estaba en el mapeo
        User storage user = users[msg.sender]; //con storage los cambios se persisten en el smart contract
        user.name = name;
        user.surName = surName;
        joinedUsers[msg.sender] = true;//le registra en el mapeo de usuarios
        total.push(msg.sender);
    }

    function getUser(address addr) public view returns (string,string){ //retorna una tupla
        require(userJoined(msg.sender)); //requiere que la persona este registrada para regresarle
        User memory user = users[addr]; //variable de memoria no se mantiene permanentemente
        return (user.name, user.surName);
    }

    function userJoined(address addr) private view returns (bool){//privado es interno del contrato no da respuesta al exterior
        return joinedUsers[addr];
    }

    function totalUsers() public view returns (uint){
        return total.length;
    }
}