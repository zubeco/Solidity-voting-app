import React from "react";
import Voting from "../../ethereum/voting";
import Layout from "../../components/Layout";
import { Link } from "../../routes";
import { State } from "../../Contexts/State";

const viewcampaign = ({ address, manager, voters, time }) => {
  // console.log({address, manager})
  
  return (
    <Layout>
      <h2 className="py-6 text-2xl font-semibold text-slate-200">
        Voting Informations
      </h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="w-full py-3 pl-4 mb-5 border-4 border-double border-slate-600 rounded-xl">
          <h2 className="text-ellipsis overflow-hidden ... pr-6">{manager}</h2>
          <h6 className="text-lg font-bold text-white">Creator Of Campaign</h6>
          <p>
            The manager created this Campaign and can create and withdraw money.
          </p>
        </div>
        <div className="w-full py-3 pl-4 mb-5 border-4 border-double border-slate-600 rounded-xl">
          <h2>{voters}</h2>
          <h6 className="text-lg font-bold text-white">
            Number Of Participants
          </h6>
          <p>
            This is the number of people expected to participate in the current
            Voting Campaign
          </p>
        </div>
        <div className="w-full py-3 pl-4 mb-5 border-4 border-double border-slate-600 rounded-xl">
          <h2>{time}</h2>
          <h6 className="text-lg font-bold text-white">Starting Time</h6>
          <p>This is the estimated starting time</p>
        </div>
      </div>
      <State.Provider value={{ address }}>
        <Link route={`/campaigns/${address}/create`}>
          <button className="px-4 py-3 mt-3 text-sm bg-indigo-900 rounded-xl">
            View Requests
          </button>
        </Link>
      </State.Provider>
    </Layout>
  );
};

viewcampaign.getInitialProps = async (props) => {
  if (!props.query.address) return {};

  const voting = Voting(props.query.address);
  
  const summary = await voting.methods.getSummary().call();

  return {
    address: props.query.address,
    manager: summary[0],
    voters: summary[1],
    time: summary[2],
  };
};
export default viewcampaign;
