import React, { useState } from "react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";
import PropagateLoader from "react-spinners/PropagateLoader";

const newcampaign = () => {
  const [minimumContribution, setMinimumContribution] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrMsg("");

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createVoting(minimumContribution).send({
        from: accounts[0],
      });

      Router.pushRoute("/");
    } catch (err) {
      setErrMsg(err.message);
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <h2 className="py-6 text-2xl font-semibold text-slate-200">
        Create Your Voting Poll!!
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="font-semibold">Number of Poll Voters </label>
        <div className="flex pt-2 align-middle">
          <input
            className="block w-full py-2 pl-3 pr-3 bg-white border rounded-md shadow-sm placeholder:text-slate-400 border-slate-300 focus:outline-none focus:border-gray-500 focus:gray-900 focus:ring-1 sm:text-sm"
            placeholder="Number of Poll Voters"
            type="number"
            value={minimumContribution}
            onChange={(e) => setMinimumContribution(e.target.value)}
          />
        </div>
        {errMsg ? (
          <div className="block w-full px-2 py-2 mt-5 text-white border rounded-md border-slate-600">
            <p className="text-white-500">Oops!</p>
            <p className="text-red-500">{errMsg}</p>
          </div>
        ) : null}
        <div className="grid w-full mt-5">
          {isLoading ? (
            <div className="grid justify-center mt-4">
              <PropagateLoader
                color={"#6366F1"}
                loading={isLoading}
                size={15}
              />
            </div>
          ) : (
            <button
              type="submit"
              className="px-2 py-2 text-white bg-indigo-500 rounded-md"
            >
              Create Poll
            </button>
          )}
        </div>
      </form>
    </Layout>
  );
};

export default newcampaign;
