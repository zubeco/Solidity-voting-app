import React from "react";
import Layout from "../components/Layout";
import { Link } from "../routes";
import factory from "../ethereum/factory";

const index = ({ campaigns }) => {
  const addressFactory = campaigns.map((address, index) => {
    return (
      <div
        key={index}
        className="w-full py-3 pl-4 mb-5 border-4 border-double border-slate-600 rounded-xl"
      >
        <div className="flex justify-between align-middle">
          <h1 className="text-xl font-semibold">{address}</h1>
        </div>
        <Link route={`/campaigns/${address}`}>
          <a className="text-sm font-bold text-indigo-900">View Campaign</a>
        </Link>
      </div>
    );
  });

  return (
    <Layout>
      <h2 className="py-6 text-xl font-semibold text-slate-200">
        Open Campaigns
      </h2>
      {addressFactory}
    </Layout>
  );
};

// class Components

index.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeloyedVoting().call();
  return { campaigns };
};

export default index;
