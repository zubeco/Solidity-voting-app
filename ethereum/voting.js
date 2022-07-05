import web3 from './web3';
import Voting from './build/VotingSystem.json'

export default (address) => {
    return new web3.eth.Contract(
        JSON.parse(Voting.interface),
        address
    )
};