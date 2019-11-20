const assert = require('assert');//permite comprobar si los valores q se va a probar corresponden con los q esperamos
const Web3 = require('web3');
const AssertionError = require('assert').AssertionError;
const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");//capa de comunicacion con el servidor
const web3 = new Web3(provider);//web 3 apuntando al servidor (ganache)

const { interface, bytecode } = require('../scripts/compile.js');//importa lo que se exporto del otro archivo

let accounts;//las cuentas del proveedor de web3 cuando se conecte con ganache
let usersContract;//instancia del contrato cuando se despliague

beforeEach(async() => {//ejecunta el codigo que esta dentro antes de hacer el test
    accounts = await web3.eth.getAccounts();
    usersContract = await new web3.eth.Contract(
        JSON.parse(interface)).
        deploy({ data: bytecode }).
        send({ from: accounts[0],gas: '1000000'});
});

describe('The UsersContract', async() => {
    it('should deploy', () =>{
        console.log(usersContract.options.address);
        assert.ok(usersContract.options.address);
    });  
    
    it('should join a user', async () => {
        let name = "m";
        let surname = "r";

        await usersContract.methods.join(name,surname).send({
            from: accounts[0], gas: '500000'
        });

    });

    it('should retrieve a user', async () => {
        let name = "m";
        let surname = "r";

        await usersContract.methods.join(name,surname).send({
            from: accounts[0], gas: '500000'
        });

        let user = await usersContract.methods.getUser(accounts[0]).call();
        assert.equal(name, user[0]);
        assert.equal(surname, user[1]);
    });

    it('should not allow joining an account twice', async() => {
        await usersContract.methods.join("n1","S1").send({
            from: accounts[1], gas: '500000'
        });
        try{
            await usersContract.methods.join("n2","s2").send({
                from: accounts[1], gas: '500000'
            });
            assert.fail('same account cant join twice');//assertion error es forzar un error
        }
        catch(e){
            if(e instanceof AssertionError){
                assert.fail(e.message);
            }
        }
    });
});