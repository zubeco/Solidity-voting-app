pragma solidity ^0.4.26;


contract votingFactory {
    address[] public deployedVotingFactory;
    address public newVotingSystem;

    function createVoting(uint min) public {
       newVotingSystem = new VotingSystem(min, msg.sender);
       deployedVotingFactory.push(newVotingSystem);
    }

    function getDeloyedVoting() public view returns (address[]){
        return deployedVotingFactory;
    }
}


contract VotingSystem {
    address public admin;
    uint public deadline;
    uint public startOfVoting; //timestamp
    uint public minimumNoOfVoters;
    uint public requestCount;
    

    enum State {Pending, Running, Paused, Ended}
    State public votingState;

    struct Request{
        string candidate;
        bool completed;
        uint noOfVoters;
        mapping(address => bool) voted;
    }

    Request[] public validVotes;
    uint public numRequests;

    // events to emit
    // event ContributeEvent(address _sender, uint _value);
    event CreateRequestEvent(string _candidate);
    event VoteRequestEvent(address _recipient, uint _value);

    constructor(uint min, address creator) public {
        admin = creator;
        deadline = block.timestamp + 604800;
        startOfVoting = block.timestamp;
        minimumNoOfVoters = min;
    }

    modifier onlyAdmin(){
        require(msg.sender == admin);
        _;
    }

    function createRequest(string memory candidate) onlyAdmin public{
        Request memory newRequest = Request({
            candidate: candidate,
            completed: false,
            noOfVoters: 0
        });

        validVotes.push(newRequest);
    }

    function voteRequest(uint _requestNo) public {
        require(startOfVoting < deadline, "The deadline has passed!!!!");
        votingState = State.Running;

        Request storage thisRequest = validVotes[_requestNo];
        require(!thisRequest.voted[msg.sender], "you have voted");    
        thisRequest.voted[msg.sender] = true;
        thisRequest.noOfVoters++;
    }

    function finalizedRequest(uint _requestNo) public onlyAdmin {
        Request storage thisRequest = validVotes[_requestNo];

        require(thisRequest.noOfVoters > (numRequests / 2));
        require(!thisRequest.completed);


        thisRequest.completed = true;
        votingState = State.Ended;
    }

    function getSummary() public view returns (address, uint, uint, State) {
        return (
            admin,
            minimumNoOfVoters,
            startOfVoting,
            votingState
        );
    }

    function getRequestsCount() public view returns (uint) {
        return validVotes.length;
    }
}