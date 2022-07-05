import web3 from "./web3";
import VotingFactory from "./build/votingFactory.json"

const instance = new web3.eth.Contract(
    JSON.parse(VotingFactory.interface),
    '0xf9A4eeF411DF7cB043DAc2418Cadafcc709BAf0e'
);

export default instance;