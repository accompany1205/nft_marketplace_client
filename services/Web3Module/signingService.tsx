import {
    Client,
    PrivateKey,
    Transaction,
    AccountId,
    TransactionId,
    PublicKey
} from "@hashgraph/sdk"


const client: Client = Client.forTestnet();
const pk = "302e020100300506032b65700422042093e3a32a53b0878429043643be0c992cec4f3e2aba8ccbde9905192e9326e0d2";
//const publicKey = "ce1311702fa06b70c76fa36e9bfb52d1ce6f250634f35f8c822259a1ef9a4a38";
const acc = "0.0.572001";
client.setOperator(acc, pk);

export async function signAndMakeBytes(trans: Transaction, signingAcctId: string) {

    const privKey = PrivateKey.fromString(pk);
    const pubKey = privKey.publicKey;

    const nodeId = [new AccountId(3)];
    const transId = TransactionId.generate(signingAcctId)

    trans.setNodeAccountIds(nodeId);
    trans.setTransactionId(transId);

    trans = await trans.freeze();

    const transBytes = trans.toBytes();

    const sig = await privKey.signTransaction(Transaction.fromBytes(transBytes) as any);

    const out = trans.addSignature(pubKey, sig);

    const outBytes = out.toBytes();

    console.log("Transaction bytes", outBytes);

    return outBytes;
}

export async function makeBytes(trans: Transaction, signingAcctId: string) {
    const transId = TransactionId.generate(signingAcctId)
    trans.setTransactionId(transId);
    trans.setNodeAccountIds([new AccountId(3)]);

    await trans.freeze();

    const transBytes = trans.toBytes();

    return transBytes;
}

export function signData(data: object): { signature: Uint8Array, serverSigningAccount: string } {
    const privKey = PrivateKey.fromString(pk);
    const pubKey = privKey.publicKey;

    const bytes = new Uint8Array(Buffer.from(JSON.stringify(data)));

    const signature = privKey.sign(bytes);

    const verify = pubKey.verify(bytes, signature); //this will be true

    return { signature: signature, serverSigningAccount: acc }
}

export function verifyData(data: object, publicKey: string, signature: Uint8Array): boolean {
    const pubKey = PublicKey.fromString(publicKey);

    const bytes = new Uint8Array(Buffer.from(JSON.stringify(data)));

    const verify = pubKey.verify(bytes, signature);

    return verify;
}