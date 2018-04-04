var DocumentChecker = artifacts.require("./DocumentChecker.sol");
var NotaryToken = artifacts.require("./NotaryToken.sol");

contract('DocumentChecker', async function (accounts) {

    let documentCheckerInstance;
    let tokenInstance;

    before(async function () {
        documentCheckerInstance = await DocumentChecker.deployed();
        tokenInstance = await NotaryToken.deployed();

        const balance = await tokenInstance.balanceOf.call(accounts[0]);
        assert.equal(balance.toNumber(), 100*1000000000000000000);

        await tokenInstance.approve(documentCheckerInstance.address, balance, {from: accounts[0]});
    });

    it('test proof', async function () {
        const start_proof = await documentCheckerInstance.getProof.call();

        await documentCheckerInstance.writeProof('Document', {from: accounts[0]});

        const final_proof = await documentCheckerInstance.getProof();

        assert.notEqual(start_proof, final_proof);
    });

    it('test owner - malicious sender', async function () {
        const start_proof = await documentCheckerInstance.getProof.call();

        try {
            await documentCheckerInstance.writeProof('Document#2', {from: accounts[1]});
            assert.equal(false)
        } catch (e) {}

        const final_proof = await documentCheckerInstance.getProof.call();

        assert.equal(start_proof, final_proof);
    });

    it('test owner - correct sender', async function () {
        const start_proof = await documentCheckerInstance.getProof();

        await documentCheckerInstance.writeProof('Document#2', {from: accounts[0]});

        const final_proof = await documentCheckerInstance.getProof();

        assert.notEqual(start_proof, final_proof);
    });


    it('test overwrite proof', async function () {
        const start_proof = await documentCheckerInstance.getProof();

        await documentCheckerInstance.overwriteProof('Document#3', {from: accounts[0]});

        const final_proof = await documentCheckerInstance.getProof();

        assert.notEqual(start_proof, final_proof);
    });

    it('test overwrite proof - bad balance', async function () {
        const start_proof = await documentCheckerInstance.getProof();

        try{
            await documentCheckerInstance.overwriteProof('Document#4', {from: accounts[1]});
            assert.equal(false);
        }catch (e) {}

        const final_proof = await documentCheckerInstance.getProof();

        assert.equal(start_proof, final_proof);
    })
});